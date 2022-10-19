import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { getLaguange } from '~/utils'
import en from './en'
import zh_cn from './zh_cn'
import zh_tw from './zh_tw'

const resources = {
	en: {
		translation: en
	},
	zh_cn: {
		translation: zh_cn
	},
	zh_tw: {
		translation: zh_tw
	}
}

i18n.use(initReactI18next).init({
	resources,
	lng: getLaguange(),
	fallbackLng: 'zh_cn',
	interpolation: {
		escapeValue: false
	}
})

export default i18n
