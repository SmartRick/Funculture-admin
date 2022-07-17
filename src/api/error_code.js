/* 成功 */

function Error_code (err_code, msg, succ = false) {
  this.err_code = err_code
  this.msg = msg
  this.succ = succ
}

const errList = {
  SUCCESS: new Error_code(200, '成功', true),
  LOGIN_SUCCESS: new Error_code(201, '成功', true),
  /* 默认失败 */
  FAIL: new Error_code(500, '失败'),
  /* 请求错误：1000～1999 */
  PARAM_NOT_VALID: new Error_code(1001, '参数无效'),
  PARAM_IS_BLANK: new Error_code(1002, '参数为空'),
  PARAM_TYPE_ERROR: new Error_code(1003, '参数类型错误'),
  PARAM_NOT_COMPLETE: new Error_code(1004, '参数缺失或读取失败'),
  PARAM_ERROR: new Error_code(1005, '参数错误'),
  REQ_METHOD_ERROR: new Error_code(1006, '请求方法错误,支持%s方法请求'),
  /* 用户错误 */
  USER_NOT_LOGIN: new Error_code(401, '用户未登录'),
  USER_ACCOUNT_EXPIRED: new Error_code(2002, '账号已过期'),
  USER_CREDENTIALS_ERROR: new Error_code(2003, '密码错误'),
  USER_CREDENTIALS_EXPIRED: new Error_code(2004, '密码过期'),
  USER_ACCOUNT_DISABLE: new Error_code(2005, '账号不可用'),
  USER_ACCOUNT_LOCKED: new Error_code(2006, '账号被锁定'),
  USER_ACCOUNT_NOT_EXIST: new Error_code(2007, '账号不存在'),
  USER_ACCOUNT_ALREADY_EXIST: new Error_code(2008, '账号已存在'),
  USER_ACCOUNT_USE_BY_OTHERS: new Error_code(2009, '您的登录已经超时或者已经在另一台机器登录，您被迫下线'),
  USER_SESSION_INVALID: new Error_code(2010, '登录已经超时'),
  NO_PERMISSION: new Error_code(2011, '没有权限'),
  TOKEN_EXPIRED: new Error_code(2012, 'TOKEN以过期'),
  TOKEN_INVALID: new Error_code(2013, 'TOKEN无效'),

  /* 业务错误 */
  NEED_VERIFY: new Error_code(3001, '请先进行验证'),
  LOGIN_LOCKED: new Error_code(3002, '登录失败，该账号被锁定，请%d分后再尝试'),

  /*部门错误*/
  DEPARTMENT_NOT_EXIST: new Error_code(5007, '数据库不存在'),
  DEPARTMENT_ALREADY_EXIST: new Error_code(5008, '数据库已存在'),

  /*运行时异常*/
  ARITHMETIC_EXCEPTION: new Error_code(9001, '算数异常'),
  NULL_POINTER_EXCEPTION: new Error_code(9002, '空指针异常'),
  ARRAY_INDEX_OUTOfBOUNDS_EXCEPTION: new Error_code(9003, '数组越界')
}

function findByCode (code) {
  for (const key in errList) {
    if (errList[key].err_code === code) return errList[key]
  }
  return null
}

export {
  findByCode,
  errList
}
