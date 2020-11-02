import React from "react"
import { Icon , Carousel, WingBlank, ListView } from 'antd-mobile';
import request from "../../../request"
import {connect} from "react-redux"
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
    const mapStateToProps = function(state){
      return {
        ischeck:state.ischeck
      }
    }
    const mapDispatchToProps = function(dispatch){
      return {
        dispatch,
        logout(){
          dispatch({type:"logout"})
        }
      }
    }

    @connect(mapStateToProps,mapDispatchToProps)
    class Home extends React.Component {
        constructor(props) {
            super(props);
            const dataSource = new ListView.DataSource({
              rowHasChanged: ( row1, row2) => true
            });
        
            this.state = {
              dataSource,
              isLoading: true,
              data: ['banner1', 'banner2', 'banner3'],
              arr:[
                {
                    name:"找攻略",
                    icon:<Icon type="check-circle" />,
                    path:"/strategy"
                     
                },
                {
                    name:"看游记",
                    icon:<Icon type="check" /> ,
                    path: "/review" 
                },
                {
                    name:"问达人",
                    icon:<Icon type="check-circle-o" /> 
                },
                {
                    name:"头脑学园",
                    icon:<Icon type="check-circle"/>     
                },
                {
                    name:"酒店",
                    icon:<Icon type="check" />     
                },
                {
                    name:"去旅行",
                    icon:<Icon type="check-circle-o" /> 
   
                },
                {
                    name:"机票",
                    icon:<Icon type="check" />     
                },
                {
                    name:"当地游乐",
                    icon:<Icon type="check-circle-o" /> 
   
                },
            ],
            imgHeight: 176,
            };
          }
          goto(id){
            this.props.history.push("/detail/"+id)
          }
          goinlogin = ()=>{
            this.props.history.push("/login")
          }
          change(path){
            this.props.history.push({
              pathname:path
            })
          }
          componentDidMount() {
            setTimeout(() => {
              this.setState({
                data: ['banner1', 'banner2', 'banner3'],
              });
            }, 100);
            request.get("/goods/list",{
                params:{
                  page:1,
                  pagesize:30
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
            let {ischeck,logout} = this.props
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
                    <div style={{ display: '-webkit-box', display: 'flex', padding: '15px 0' }} onClick={this.goto.bind(this,obj._id)}>
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
            return(
                <div className="con">
                    <header>
                        <h1>
                            <img src="/images/logo2.png" alt=""/>
                        </h1>
                        <div>
                            搜索目的地/攻略/游记
                            <Icon type="search" size={"xxs"} />
                        </div>
                        {
                          ischeck ? <a onClick={logout}>退出</a> : <a onClick={this.goinlogin}>登录</a>
                        }
                        
                    </header>
                    <main>
                      <section>
                        <div className="con_box">
                        <WingBlank >
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
                    <ul className="event">
                        {
                            this.state.arr.map(item=>{
                                return(
                                    <li onClick={this.change.bind(this,item.path)} key={item.name}>
                                        {item.icon}
                                        <span>{item.name}</span>
                                    </li>
                                )
                            })
                        }
                    </ul>
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
                        scrollRenderAheadDistance={500}
                        onEndReached={this.onEndReached}
                        onEndReachedThreshold={10}
                    />
                        </div>
                      </section>
                    
                    </main>                    
                </div>            
            )
        } 
}

export default Home