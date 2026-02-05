import homepage from './documents/homepage'
import {navigation} from './documents/navigation'
import page from './documents/page'
import referenz from './documents/referenz'
import {siteSettings} from './documents/siteSettings'
import contactForm from './modules/contactForm'
import contactModule from './modules/contactModule'
import contentModule from './modules/contentModule'
import dienstleistungenCards from './modules/dienstleistungenCards'
import imageText from './modules/imageText'
import managementModule from './modules/managementModule'
import referenzenOverview from './modules/referenzenOverview'
import sectionHeader from './modules/sectionHeader'

export const schemaTypes = [
  // Documents
  homepage,
  navigation,
  page,
  referenz,
  siteSettings,

  // Modules
  sectionHeader,
  contentModule,
  imageText,
  referenzenOverview,
  dienstleistungenCards,
  contactModule,
  contactForm,
  managementModule,
]
