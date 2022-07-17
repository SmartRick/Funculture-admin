import { post_form } from '@/api/_service.js'
import { find, assign } from 'lodash'
import faker from 'faker/locale/zh_CN'
import { requestForMock, mock } from '@/api/_service.js'
import * as tools from '@/api/_tools.js'

const users = [
  { username: 'admin', password: 'admin', id: 'admin-uuid', name: 'Admin' },
  { username: 'editor', password: 'editor', id: 'editor-uuid', name: 'Editor' },
  { username: 'user1', password: 'user1', id: 'user1-uuid', name: 'User1' }
]


/**
 * @description 登录
 * @param {Object} data 登录携带的信息
 */
export function SYS_USER_LOGIN (data = {}) {
  // 接口请求
  return post_form('/login', data)
}


/**
 * @description 登录
 * @param {Object} data 登录携带的信息
 */
export function MOCK_SYS_USER_LOGIN (data = {}) {
  // 模拟数据
  mock
    .onAny('/login')
    .reply(config => {
      const user = find(users, tools.parse(config.data))
      return user
        ? tools.responseSuccess(assign({}, user, { token: faker.random.uuid() }))
        : tools.responseError({}, '账号或密码不正确')
    })
  // 接口请求
  return requestForMock({
    url: '/login',
    method: 'post',
    data
  })
}
