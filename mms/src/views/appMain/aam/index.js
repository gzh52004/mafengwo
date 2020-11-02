import React from 'react';
import { Breadcrumb,Form, Select, Tooltip, Button,Table, Tag, Space,Pagination  } from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons';

import request from "../../../utils/request"
import "./aam.css"

const { Option } = Select;
class  Aam extends React.Component {
  state={
    columns:[
      {title: '序号',
      dataIndex: 'key',
        key: 'key',
    },
      {
        title: '昵称',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '用户名',
        dataIndex: 'time',
        key: 'time',
      },
      {
        title: '性别',
        key: 'sex',
        dataIndex: 'sex',
      },
      {
        title: '手机号',
        dataIndex: 'phone',
        key: 'phone',
      },
      {
        title: '头像',
        dataIndex: 'src',
        key: 'src',
        render: text => <a><img src={text} style={{width:"40px",height:"40px",borderRadius:"50%"}}/></a>,
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
          time: item.data_source.mdd.id,
          sex: (item.data_source.reply_num>2)?"女":"男",
          phone: item.data.id,
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
    <div className="aam" >
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
export default Aam;