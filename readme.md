账户首次创建，需要提示未激活，此时发送请求会得到，Account not found
{
  result: {
    account: 'rfWoiHZcqzqCiBydvbq4gE2BkGmrFAkLjq',
    error: 'actNotFound',
    error_code: 19,
    error_message: 'Account not found.',
    ledger_current_index: 43701125,
    request: {
      account: 'rfWoiHZcqzqCiBydvbq4gE2BkGmrFAkLjq',
      command: 'account_info',
      ledger_index: 'current',
      queue: true
    },
    status: 'error',
    validated: false
  }
}
在以任何方式转入10xrp后，账户激活，但这10xrp是不可以转出的。如果转出后余额小于10xrp，则会只消耗手续费，0.000012（手续费固定），这里需要最好验证一下。
转入地址如果没有xrp，则必须转入金额+对方余额必须大于10才能转。
在余额小于10xrp后，理论上就不可以进行转账操作了。
给自己转账会报错，XrplError: The latest ledger sequence 43701391 is greater than the transaction's LastLedgerSequence (43701390).

token转账
需要设置 trust line, 对方必须开启才能接受token，否则转账失败（会消耗手续费）并提示流动性不足。
这个trust line的设置，会导致账户中需要保留的xrp增加。
在去中心化市场上交易token时，则没有这个限制（会自动添加trust line）。
首先应，确认目标账户 trust line 额度。转账金额大于额度时，才能转出。

需要熟读错误代码
