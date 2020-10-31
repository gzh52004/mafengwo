import React from "react"
import request from "../../../request"
import { ListView } from 'antd-mobile';

let data1 = [];
const NUM_ROWS = 4;
let pageIndex = 0;

function genData(pIndex = 0) {
  const dataBlob = {};
  
  for (let i = 0; i < NUM_ROWS; i++) {
    const ii = (pIndex * NUM_ROWS) + i;
    dataBlob[`${ii}`] = `row - ${ii}`;
  }
  return dataBlob;
}

class Demo extends React.Component {
  constructor(props) {
    super(props);
    const dataSource = new ListView.DataSource({
      rowHasChanged: ( row1, row2) => true
    });

    this.state = {
      dataSource,
      isLoading: true,
    };
  }

  componentDidMount() {
    request.get("/goods/list",{
      params:{
        page:1,
        pagesize:30
      }
    }).then(res=>{
      data1 = res.data.data
      console.log(data1)
    })

    setTimeout(() => {
      this.rData = genData();
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(this.rData),
        isLoading: false,
      });
    }, 600);
  }


  onEndReached = (event) => {
    if (this.state.isLoading && !this.state.hasMore) {
      return;
    }
    console.log('reach end', event);
    this.setState({ isLoading: true });
    setTimeout(() => {
      this.rData = { ...this.rData, ...genData(++pageIndex) };
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(this.rData),
        isLoading: false,
      });
    }, 1000);
  }

  render() {
    const separator = (sectionID, rowID) => (
      <div
        key={`${sectionID}-${rowID}`}
        style={{
          backgroundColor: '#F5F5F9',
          height: 8,
          borderTop: '1px solid #ECECED',
          borderBottom: '1px solid #ECECED',
        }}
      />
    );
    let index = data1.length - 1;
    const row = (rowData, sectionID, rowID) => {
      if (index < 0) {
        index = data1.length - 1;
      }
      const obj = data1[index--];
      return (
        <div key={rowID} style={{ padding: '0 15px' }}>
          <div
            style={{
              lineHeight: '50px',
              color: '#888',
              fontSize: 18,
              borderBottom: '1px solid #F6F6F6',
              textOverflow:"ellipsis",
              whiteSpace:"nowrap",
              overflow:"hidden"
            }}
          >{obj.data.title}</div>
          <div style={{ display: '-webkit-box', display: 'flex', padding: '15px 0' }}>
            <img style={{ height: '64px', marginRight: '15px' }} src={obj.data.image} alt="" />
            <div style={{ lineHeight: 1, width:"240px", display:"flex", flexDirection:"column",justifyContent:"space-between"}}>
          <div style={{width:"100%",textOverflow:"ellipsis", whiteSpace:"nowrap", overflow:"hidden" , fontWeight: 'bold'}}>{obj.data.content}</div>
              <div style={{display:"flex",justifyContent:"space-between"}}><span style={{ fontSize: '14px', color: '#FF6E27' }}>{obj.data_source.user.name}</span>
              <img style={{ height: '30px', marginRight: '15px',borderRadius:"50%" }} src={obj.data_source.user.logo} alt="" />
              </div>
            </div>
          </div>
        </div>
      );
    };
    return (
      <ListView
        ref={el => this.lv = el}
        dataSource={this.state.dataSource}
        renderHeader={() => <span>推荐攻略</span>}
        renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>
          {this.state.isLoading ? 'Loading...' : 'Loaded'}
        </div>)}
        renderRow={row}
        renderSeparator={separator}
        className="am-list"
        pageSize={4}
        useBodyScroll
        onScroll={() => { console.log('scroll'); }}
        scrollRenderAheadDistance={500}
        onEndReached={this.onEndReached}
        onEndReachedThreshold={10}
      />
    );
  }
}

export default Demo 
