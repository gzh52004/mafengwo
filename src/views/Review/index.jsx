import React from "react"
import {withverify} from "@/hoc/hoc"
import request from "../../../request"
import { Icon , Carousel, WingBlank, ListView } from 'antd-mobile';

import "./index.scss"

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

class Review extends React.Component{
    constructor(props) {
        super(props);
            const dataSource = new ListView.DataSource({
              rowHasChanged: ( row1, row2) => true
            });
        this.state = {
            dataSource,
            isLoading: true,
            data: ['banner4', 'banner5', 'banner6','banner7','banner8'],
            imgHeight: 176,
            }   
    }   
    goto(id){
        this.props.history.push("/detail/"+id)
      }
    goin(path){
        this.props.history.push({
            pathname:path
        })
    }
      componentDidMount() {
        request.get("/goods/list",{
            params:{
              page:1,
              pagesize:20
            }
          }).then(res=>{
            data1 = res.data.data
          })
          
          setTimeout(() => {
                this.rData = genData();
                this.setState({
                  dataSource: this.state.dataSource.cloneWithRows(this.rData),
                  isLoading: false,
                });
              }, 600);
        // simulate img loading
        // setTimeout(() => {
        //   this.setState({
        //     // data: ['banner4', 'banner5', 'banner6','banner7','banner1'],
        //   });
        // }, 100);
      }
      onEndReached = (event) => {
        if (this.state.isLoading && !this.state.hasMore) {
          return;
        }
        
        this.setState({ isLoading: true });
        setTimeout(() => {
          this.rData = { ...this.rData, ...genData(++pageIndex) };
          this.setState({
            dataSource: this.state.dataSource.cloneWithRows(this.rData),
            isLoading: false,
          });
        }, 1000);
      }

    render(){
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
          const row = (rowID) => {
              if (index < 0) {
                index = data1.length - 1;
              }
              const obj = data1[index--];
              return (
                      <div key={rowID} className="listbox">
                          {/* <div
                          style={{
                              lineHeight: '50px',
                              color: '#888',
                              fontSize: 18,
                              borderBottom: '1px solid #F6F6F6',
                              textOverflow:"ellipsis",
                              whiteSpace:"nowrap",
                              overflow:"hidden"
                          }}
                          >{obj.data.title}</div> */}
                          <div style={{ display: '-webkit-box', display: 'flex', padding: '15px 0' }} onClick={this.goto.bind(this,obj._id)}>
                          <div style={{ lineHeight: 1, width:"240px", display:"flex", flexDirection:"column",justifyContent:"space-between"}}>
                          <div style={{width:"100%",textOverflow:"ellipsis", whiteSpace:"nowrap", overflow:"hidden" , fontWeight: 'bold'}}>{obj.data.content}</div>
                              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}><span style={{ fontSize: '14px', color: '#FF6E27' }}>{obj.data_source.user.name}</span>
                                <img style={{ height: '30px', marginRight: '15px',borderRadius:"50%" }} src={obj.data_source.user.logo} alt="" />
                              </div>
                          </div>
                          <div style={{height:"100%" ,width:"100%"}}>
                            <img style={{width:"100%", height: '100%'}} src={obj.data.image} alt="" />
                          </div>
                          </div>
                      </div>
                      );
                  };
        return(
            <div>
                <header>
                    <h1 onClick={this.goin.bind(this,"/home")}>
                        <img src="/images/logo2.png" alt=""/>
                    </h1>
                    <div className="top_r">
                        <span onClick={this.goin.bind(this,"/home")}>官方首页</span>
                        <Icon type="search" size={"xs"} />
                    </div>
                </header>
                <WingBlank>
                    <Carousel
                    autoplay={false}
                    infinite
                    >
                    {this.state.data.map(val => (
                        <a
                        key={val}
                        style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
                        >
                        <img
                            src={`/images/${val}.png`}
                            alt=""
                            style={{ width: '100%', verticalAlign: 'top' }}
                            onLoad={() => {
                            window.dispatchEvent(new Event('resize'));
                            this.setState({ imgHeight: 'auto' });
                            }}
                        />
                        </a>
                    ))}
                    </Carousel>
                </WingBlank>
                <ListView
                        ref={el => this.lv = el}
                        dataSource={this.state.dataSource}
                        renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>
                        {this.state.isLoading ? 'Loading...' : 'Loaded'}
                        </div>)}
                        renderRow={row}
                        renderSeparator={separator}
                        className="am-list"
                        pageSize={4}
                        useBodyScroll
                        scrollRenderAheadDistance={500}
                        onEndReached={this.onEndReached}
                        onEndReachedThreshold={10}
                    />
            </div>
        )
    }



}

Review = withverify(Review)

export default Review