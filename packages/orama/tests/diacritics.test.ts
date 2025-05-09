import t from 'tap'
import { replaceDiacritics } from '../src/components/tokenizer/diacritics.js'

t.test('Diacritics Replacer', async (t) => {
  t.test('should replace diacritics', async (t) => {
    const I1 = 'áàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ'
    const I2 = 'áaauioèaíïóiuubnÁoiÃotytÓhygÚnÑ'
    const I3 = 'aaaaeeeiiooooucnAAAAEEIIOOOOUCN'

    const O1 = replaceDiacritics(I1)
    const O2 = replaceDiacritics(I2)
    const O3 = replaceDiacritics(I3)

    t.equal(O1, 'aaaaeeeiiooooucnAAAAEEIIOOOOUCN')
    t.equal(O2, `aaauioeaiioiuubnAoiAotytOhygUnN`)
    t.equal(O3, `aaaaeeeiiooooucnAAAAEEIIOOOOUCN`)
  })
})
