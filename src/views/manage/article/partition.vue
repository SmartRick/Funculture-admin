<template>
  <d2-container>
    <template slot="header">分区</template>
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters" @submit.native.prevent>
        <el-form-item>
          <el-input v-model="filters.partTitle" placeholder="分区名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-select v-model="filters.partTypeId" placeholder="分区类型">
            <el-option v-for="(item,index) in partTypes" :label="item.partType" :value="item.id"
                       :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-on:click="searchData">查询</el-button>
        </el-form-item>

        <el-button type="success" @click="dialogAddForm()">新增</el-button>
        <el-button type="danger" @click="batchRemove">批量删除</el-button>
      </el-form>

    </el-col>

    <!--列表-->
    <el-table :data="list" highlight-current-row @selection-change="selectChange" style="width: 100%;">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column type="index" label="序号" width="60">
      </el-table-column>
      <el-table-column label="分区封面" width="100">
        <template #default="{row}">
          <el-avatar :src="row.coverUrl" :size="50" fil="cover"></el-avatar>
        </template>
      </el-table-column>
      <el-table-column prop="partTitle" label="分区名称">
      </el-table-column>
      <el-table-column prop="partDesc" label="分区描述" width="200">
      </el-table-column>
      <el-table-column label="分区类型" width="120">
        <template #default="{row}">
          <el-tag>{{ row.partTypeId | partTypeFilter(that)}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="createdAt" label="创建时间" min-width="160">
      </el-table-column>
      <el-table-column prop="updatedAt" label="更新时间" min-width="160">
      </el-table-column>
      <el-table-column label="操作" width="150" fixed="right">
        <template slot-scope="scope">
          <el-button size="small" @click="dialogUpdateForm(scope.$index, scope.row)" round>编辑</el-button>
          <el-popconfirm
            confirm-button-text='确定'
            cancel-button-text='取消'
            icon="el-icon-info"
            icon-color="red"
            title="是否确认删除该记录？"
            @confirm="handleDel(scope.$index, scope.row)"
          >
            <el-button slot="reference" type="danger" size="small" round>删除</el-button>
          </el-popconfirm>
          <!--          <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>-->
        </template>
      </el-table-column>
    </el-table>

    <!--工具条-->
    <el-col :span="24" class="toolbar">
      <el-pagination :background="true" layout="total, sizes, prev, pager, next, jumper"
                     @current-change="handleCurrentChange" :current-page="pageData.pageNum"
                     :page-size="pageData.pageSize" :total="total"
                     style="float:right;">
      </el-pagination>
    </el-col>

    <!--编辑界面-->
    <el-dialog :title="dialogFormTitle" :visible.sync="dialogFormVisible" :close-on-click-modal="false">
      <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
        <el-form-item label="分区封面" prop="coverUrl">
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="uploadSuccess"
            :before-upload="beforeUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="分区名称" prop="partTitle">
          <el-input v-model="editForm.partTitle" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="分区类型" prop="partTypeId">
          <el-select v-model="editForm.partTypeId" placeholder="分区类型">
            <el-option v-for="(item,index) in partTypes" :label="item.partType" :value="item.id"
                       :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="分区描述" prop="partDesc">
          <el-input type="textarea" v-model="editForm.partDesc"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="dialogFormVisible=false">取消</el-button>
        <el-button v-if="dialogFormTitle==='新增'" type="primary" @click="handleAdd">添加</el-button>
        <el-button v-else type="primary" @click="handleEdit">修改</el-button>
      </div>
    </el-dialog>

  </d2-container>
</template>

<script>
  import { merge } from 'lodash'
  import partApi from '@/api/article.partition'

  export default {
    name: 'partition-manage',
    components: {},

    data () {
      return {
        that: this,
        //过滤参数
        filters: {
          partTitle: '',
          partTypeId: '',
        },
        list: [],
        selectRows: '',
        partTypes: [],
        pageData: {
          pageNum: 1,
          pageSize: 10,
        },
        total: 0,
        pages: 0,
        dialogFormVisible: false,
        dialogFormTitle: '新增',
        editForm: {
          coverUrl: [
            {
              require: true,
              message: '请上传分区封面',
              trigger: 'blur'
            }
          ],
          partTitle: [
            {
              require: true,
              message: '请输入分区名称',
              trigger: 'blur'
            }
          ],
          partDesc: [
            {
              require: true,
              message: '请输入分区描述',
              trigger: 'blur'
            }
          ]
        },
        editFormRules: {},
        imageUrl: ''
      }
    },
    methods: {
      //加载数据
      loadData (filter = false) {
        let reqData = this.pageData
        if (filter) {
          reqData = merge(this.filters, this.pageData)
        }
        partApi.QUERY_BY_PAGE(reqData).then(res => {
          this.pageData.total = res.total
          this.pageData.pages = res.pages
          this.list = res.list
        })
      },
      //添加数据
      handleAdd () {
        this.$refs['editForm'].validate(valid => {
          if (valid) {
            partApi.ADD(this.editForm)
          }
        })
      },
      searchData () {
        this.loadData(true)
      },
      //批量删除
      batchRemove () {
        if (this.selectRows.length <= 0) {
          this.$message({
            message: '请选择你要删除的数据',
            type: 'warning',
            duration: 1500,
            center: true
          })
        } else {
          let ids = this.selectRows.map(row => row.id)
          partApi.BATCH_REMOVES(ids).then(res => {
            this.loadData()
          })
        }
      },
      //加载分区数据
      loadTypeDate () {
        partApi.QUERY_TYPE_BY_PAGE().then(res => {
          this.partTypes = res.list
        })
      },
      selectChange (rows) {
        this.selectRows = rows
      },
      handleEdit (index, row) {
        console.log('编辑')
      },
      handleDel (index, row) {
        let that = this
        partApi.REMOVE(row.id).then(res => {
          that.loadData()
        })
      },
      handleCurrentChange (index) {
        console.log('改变')
      },
      dialogAddForm () {
        this.dialogFormTitle = '新增'
        this.$refs['editForm'].resetFields()
        this.editForm = {}
        this.imageUrl = ''
        this.dialogFormVisible = true
      },
      dialogUpdateForm (index, row) {
        this.dialogFormTitle = '编辑'
        this.editForm = row
        this.imageUrl = row.coverUrl
        this.dialogFormVisible = true
      },
      uploadSuccess (res, file) {
        this.imageUrl = URL.createObjectURL(file.raw)
        this.editForm.coverUrl = this.imageUrl
      },
      beforeUpload (file) {
        const isJPG = file.type === 'image/jpeg'
        const isLt2M = file.size / 1024 / 1024 < 2

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!')
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!')
        }
        return isJPG && isLt2M
      }
    },
    mounted () {
      this.loadTypeDate()
      this.loadData()
    },
    filters: {
      partTypeFilter (val, _this) {
        let type = _this.partTypes.filter(type => type.id === val)
        return type ? type[0].partType : '未知'
      }
    }
  }
</script>

<style lang="scss" scoped>
  .icon-demo {
    transition: all .3s;
    font-size: 100px;
    color: #409EFF;
    @extend %unable-select;

    &:hover {
      color: #F56C6C;
      transform: scale(1.2) rotate(30deg);
    }
  }


  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
