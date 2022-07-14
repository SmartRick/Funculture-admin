import { from } from '@/api/_service.js'

const users = [
  {
    username: 'admin',
    password: 'admin',
    uuid: 'admin-uuid',
    name: 'Admin'
  },
  {
    username: 'editor',
    password: 'editor',
    uuid: 'editor-uuid',
    name: 'Editor'
  },
  {
    username: 'user1',
    password: 'user1',
    uuid: 'user1-uuid',
    name: 'User1'
  }
]

/**
 * @description 登录
 * @param {Object} data 登录携带的信息
 */
export function SYS_USER_LOGIN (data = {}) {
  // 接口请求
  return from('/login', data)
}
