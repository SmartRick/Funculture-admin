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
          <el-button type="primary" v-on:click="loadData">查询</el-button>
        </el-form-item>

        <el-button type="success" @click="handleAdd">新增</el-button>
        <el-button type="danger" @click="batchRemove">批量删除</el-button>
      </el-form>

    </el-col>

    <!--列表-->
<!--    <el-table :data="list" highlight-current-row @selection-change="selectChange" style="width: 100%;">-->
<!--      <el-table-column type="selection" width="55">-->
<!--      </el-table-column>-->
<!--      <el-table-column type="index" label="序号" width="60">-->
<!--      </el-table-column>-->
<!--      <el-table-column label="分区封面" width="100">-->
<!--        <template #default="{row}">-->
<!--          <el-avatar :src="row.coverUrl" :size="50" fil="cover"></el-avatar>-->
<!--        </template>-->
<!--      </el-table-column>-->
<!--      <el-table-column prop="partTitle" label="分区名称" width="180">-->
<!--      </el-table-column>-->
<!--      <el-table-column prop="partDesc" label="分区描述" width="200">-->
<!--      </el-table-column>-->
<!--      <el-table-column label="分区类型" width="120">-->
<!--        <template #default="{row}">-->
<!--          <el-tag>{{ row.partTypeId  }}</el-tag>-->
<!--        </template>-->
<!--      </el-table-column>-->
<!--      <el-table-column prop="createdAt" label="创建时间" min-width="160">-->
<!--      </el-table-column>-->
<!--      <el-table-column prop="updatedAt" label="更新时间" min-width="160">-->
<!--      </el-table-column>-->
<!--      <el-table-column label="操作" width="150" fixed="right">-->
<!--        <template slot-scope="scope">-->
<!--          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>-->
<!--          <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>-->
<!--        </template>-->
<!--      </el-table-column>-->
<!--    </el-table>-->

    <!--工具条-->
<!--    <el-col :span="24" class="toolbar">-->
<!--      <el-pagination :background="true" layout="total, sizes, prev, pager, next, jumper" @current-change="handleCurrentChange" :current-page="pageData.pageNum" :page-size="pageData.pageSize" :total="total"-->
<!--                     style="float:right;">-->
<!--      </el-pagination>-->
<!--    </el-col>-->

    <!--        &lt;!&ndash;编辑界面&ndash;&gt;-->
    <!--        <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" :close-on-click-modal="false">-->
    <!--          <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">-->
    <!--            <el-form-item label="姓名" prop="name">-->
    <!--              <el-input v-model="editForm.name" auto-complete="off"></el-input>-->
    <!--            </el-form-item>-->
    <!--            <el-form-item label="性别">-->
    <!--              <el-radio-group v-model="editForm.sex">-->
    <!--                <el-radio class="radio" :label=1>男</el-radio>-->
    <!--                <el-radio class="radio" :label=0>女</el-radio>-->
    <!--              </el-radio-group>-->
    <!--            </el-form-item>-->
    <!--            <el-form-item label="年龄">-->
    <!--              <el-input-number v-model="editForm.age" :min="0" :max="200"></el-input-number>-->
    <!--            </el-form-item>-->
    <!--            <el-form-item label="生日">-->
    <!--              <el-date-picker type="date" placeholder="选择日期" v-model="editForm.birth"></el-date-picker>-->
    <!--            </el-form-item>-->
    <!--            <el-form-item label="地址">-->
    <!--              <el-input type="textarea" v-model="editForm.addr"></el-input>-->
    <!--            </el-form-item>-->
    <!--          </el-form>-->
    <!--          <div slot="footer" class="dialog-footer">-->
    <!--            <el-button @click.native="dialogFormVisible=false">取消</el-button>-->
    <!--            <el-button v-if="dialogStatus=='create'" type="primary" @click="createData">添加</el-button>-->
    <!--            <el-button v-else type="primary" @click="updateData">修改</el-button>-->
    <!--          </div>-->
    <!--        </el-dialog>-->
  </d2-container>
</template>

<script>
import { merge } from 'lodash'
import { QUERY_BY_PAGE, QUERY_TYPE_BY_PAGE } from '@/api/article.partition'

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
      list: {},
      selectRows: '',
      partTypes: [],
      pageData: {
        pageNum: 1,
        pageSize: 10,
      },
      total: 0,
      pages: 0,
    }
  },
  methods: {
    //加载数据
    loadData (params = {}) {
      let reqData = merge(params, this.pageData)
      QUERY_BY_PAGE(reqData).then(res => {
        this.pageData.total = res.total
        this.pageData.pages = res.pages
        this.list = res.list
      })
    },
    //添加数据
    handleAdd () {

    },
    //批量删除
    batchRemove () {

    },
    //加载分区数据
    loadTypeDate () {
      QUERY_TYPE_BY_PAGE().then(res => {
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
      console.log('删除')
    },
    handleCurrentChange (index) {
      console.log('改变')
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
</style>
