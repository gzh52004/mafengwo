import React from 'react';
import { Breadcrumb,Form, Select, Tooltip, Button,Table, Tag, Space,Pagination  } from 'antd';

import "./shop.css"
import request from "../../../utils/request"

const { Option } = Select;
class Shop extends React.Component {
 

  state={
    columns:[
      {title: '序号',
      dataIndex: 'key',
        key: 'key',
    },
      {
        title: '分享标题',
        dataIndex: 'name',
        key: 'name',
        render: text => <p style={{width:"180px"}}>{text}</p>,
      },
      {
        title: '驴友分享',
        key: 'address',
        dataIndex: 'address',
        render: text => <a style={{display:"block",width:"240px",whiteSpace:"nowrap",textOverflow:"ellipsis",overflow:"hidden"}}>{text}</a>,
      },
      {
        title: '分享图片',
        dataIndex: 'src',
        key: 'src',
        render: text => <a><img src={text} style={{width:"80px",height:"80px"}}/></a>,
      },
      {
        title: '操作',
        key: 'action',
        render: (text, record) => (
          <Space size="middle">
            <a>修改信息</a>
            <a>删除</a>
          </Space>
        ),
      },
    ],
    data:[] 
  }

  componentDidMount(){
   request.get("/goods/list",{
     params:{
       page:1,
       pagesize:100
     }
   }).then((res)=>{
    console.log(res.data.data,"res");
    const olddata = res.data.data
    let newdata1 = []
    olddata.forEach((item,index) => {
        const newdata={
          key: index+1,
          name:item.data.title,
          address: item.data.content,
          src:item.data.image
        }
        newdata1.push(newdata)
    })
    this.setState({data:newdata1})
   })
  }

  render(){
    const {columns,data} = this.state
    console.log(this.state.data,"data");
    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: false,
      showTotal: () => `共${data.length}条`,
      pageSizeOptions:[5,10,15,20],
  }
  return (
    <div className="shop" >
       <Breadcrumb>
        <Breadcrumb.Item>景点介绍</Breadcrumb.Item>
      </Breadcrumb>

      <Form>
        <label>用户名：<input type="text"/></label>
        <lable>性别：
            <Select placeholder="男">
              <Option value="男">男</Option>
              <Option value="女">女</Option>
            </Select>
          </lable>
      <lable>手机号：<input type="text"/></lable>
      <Button type="primary" >
      查询
     </Button>
     <Button type="ghost"  >
      新增
     </Button>
     <Button type="dashed" >
      重置
     </Button>
    </Form>
    
    <Table columns={columns} dataSource={data} defaultCurrent={2}  pagination={ paginationProps }>
   
    </Table> 
    </div>
  );
}
}
export default Shop;