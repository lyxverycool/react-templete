import React from 'react'
import { Empty } from 'antd-mobile'
import { useTranslation } from 'react-i18next'
import NoDataPng from '~/images/no-data.png'
import './style.less'

export default ({ description, image, style }) => {
  const { t } = useTranslation()
  return (
    <Empty
      style={style}
      image={image || NoDataPng}
      description={description || t('showTip.noData')}
    />
  )
}
