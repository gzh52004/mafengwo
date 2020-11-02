import React, { useState } from 'react';
import { Breadcrumb,Form, Select, Tooltip, Button,Table, Tag, Space,Pagination  } from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons';

import "./user.css"
import request from "../../../utils/request"

const { Option } = Select;
class User extends React.Component {
 

  state={
    columns:[
      {title: '序号',
      dataIndex: 'key',
        key: 'key',
    },
      {
        title: '作者',
        dataIndex: 'name',
        key: 'name',
        render: text => <a>{text}</a>,
      },
      {
        title: '时间',
        dataIndex: 'time',
        key: 'time',
      },
      {
        title: '标题',
        key: 'address',
        dataIndex: 'address',
        render: text => <p style={{width:"180px",whiteSpace:"nowrap",textOverflow:"ellipsis",overflow:"hidden"}}>{text}</p>,
      },
      {
        title: '头像',
        dataIndex: 'src',
        key: 'src',
        render: text => <a><img src={text} style={{width:"50px",height:"50px"}}/></a>,
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
          name: item.data_source.user.name,
          time: item.data_source.mtime,
          address: item.data.title,
          src:item.data_source.user.logo
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
    <div className="user" >
      <Breadcrumb>
        <Breadcrumb.Item>用户管理</Breadcrumb.Item>
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
export default User;