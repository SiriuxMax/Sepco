import createNumberMask from 'text-mask-addons/dist/createNumberMask'

export class GenerateMask {
    public static numberMask = createNumberMask({
        prefix: '',
        suffix: '',
        thousandsSeparatorSymbol: '.',
        allowDecimal: false
        // This will put the dollar sign at the end, with a space.
    })
    public static Nodecimal = createNumberMask({
        prefix: '',
        suffix: '',
        thousandsSeparatorSymbol: '',
        allowDecimal: false
        // This will put the dollar sign at the end, with a space.
    })
}
// First, you need to create the `numberMask` with your desired configurations

