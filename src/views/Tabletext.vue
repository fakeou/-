<template>
  <div>
      <el-table height="315"
      :data="tabledata">
      <el-table-column 
      prop="Sno" label="学号">
        <template slot="header"></template>
      </el-table-column>
      <el-table-column 
      prop="Sname" label="学生姓名">
      </el-table-column>
      <el-table-column 
      prop="Ssex" label="性别">
      </el-table-column>
      <el-table-column 
      prop="Sage" label="年龄">
      </el-table-column>
      <el-table-column 
      prop="Sdept" label="系别">
      </el-table-column>
       <el-table-column align="center" label="操作">
          <template slot="header" slot-scope="scope">
            <div class="head">
        <el-input
          v-model="search"
          size="mini"
          placeholder="输入关键字搜索"/>
          <el-button 
          size="mini"
          icon="el-icon-search" circle type="primary" @click="searchClick"></el-button>
          </div>
      </template>
      <template slot-scope="scope">
        <el-button size="mini" 
        @click="updateForm(scope.$index,scope.row)">编辑</el-button>
      
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
      </el-table>
      <el-button type="primary" class="addstudent" @click="dialogFormVisible = true">添加学生</el-button>

      <el-dialog title="添加学生信息" :visible.sync = "dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="学号">
            <el-input v-model="form.Sno"></el-input>
          </el-form-item>
          <el-form-item label="姓名">
            <el-input v-model="form.Sname"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-input v-model="form.Ssex"></el-input>
          </el-form-item>
          <el-form-item label="年龄">
            <el-input v-model="form.Sage"></el-input>
          </el-form-item>
          <el-form-item label="系别">
            <el-input v-model="form.Sdept"></el-input>
          </el-form-item>
        </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button @click="submitClick">提交</el-button>
      </div>
      </el-dialog>

      <el-dialog title="编辑学生信息" :visible.sync = "updateFormVisible">
        <el-form :model="form">
          <el-form-item>
            <el-radio-group v-model="radio">
              <el-radio-button label="学号"></el-radio-button>
              <el-radio-button label="学生姓名"></el-radio-button>
              <el-radio-button label="性别"></el-radio-button>
              <el-radio-button label="年龄"></el-radio-button>
              <el-radio-button label="系别"></el-radio-button>
            </el-radio-group>
            <el-input v-model="updateinput"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
        <el-button @click="updateFormVisible = false">取消</el-button>
        <el-button @click="updateClick">修改</el-button>
      </div>
      </el-dialog>
  </div>
</template>
<script>
import detailrequest, { getSelectdata, getCreatedata, getDeletedata, getUpdatedata } from '../network/detailrequest'

export default {
 data() {
   return {
     tabledata: [],
     search: '',
     searchData: {},
     dialogFormVisible: false ,
     updateFormVisible:false,
    form: {
      Sno:'',
      Sname:'',
      Ssex:'',
      Sage:'',
      Sdept:''
    },
    radio: '学号',
    updatevalue: '',
    updateinput: '',
    index: 0,
    update: {}
   }
 },
  created() {
    getSelectdata().then(res => {
      console.log(res.data[0]);
      this.tabledata = res.data[0]
       
    })
  },
  methods: {                              //提交增加数据
    submitClick() {
      this.tabledata.push(this.form)
      console.log(this.tabledata);
      var getdata = this.form
      getCreatedata(getdata.Sno,getdata.Sname,getdata.Ssex,getdata.Sage,getdata.Sdept)
      this.dialogFormVisible = false
    },
    handleDelete(index,row){              //删除数据
      var deleteSno = row.Sno
      this.tabledata.splice(index,1)
      getDeletedata(deleteSno) 
    },  
    searchClick() {                         //模糊搜索
      var search = this.search
      if(search) {
        this.searchData = this.tabledata.filter((product) => {
          // console.log(product);
          return Object.keys(product).some((key) => {
            // console.log(key);
            return String(product[key]).indexOf(search) > -1
          })
        })
      }
      console.log(this.searchData);
      this.tabledata = this.searchData
    },
    updateForm(index,rowdata) {   //获取点击编辑时的该行的数据，oldvalue
      this.updateFormVisible = true     //v-model绑定的是newvalue
      this.update = this.tabledata[index]
      console.log(this.update);
      this.index = index
    },
    updateClick(){
      switch (this.radio) {
        case '学号':
            this.updatevalue = 'Sno'
          break;
        case '学生姓名':
            this.updatevalue = 'Sname'
          break;
        case '性别':
            this.updatevalue = 'Ssex'
          break;
        case '年龄':
            this.updatevalue = 'Sage'
          break;
        case '系别':
            this.updatevalue = 'Sdept'
          break;
      }
      getUpdatedata(this.updatevalue,this.updateinput,this.update[this.updatevalue])
      this.tabledata[this.index][this.updatevalue] = this.updateinput
      this.updateinput = ''
      this.updateFormVisible = false
    }
  }
}
</script>

<style>
.head {
  display: flex;
}
.addstudent {
  position: absolute;
  right: 6vw;
}
</style>
