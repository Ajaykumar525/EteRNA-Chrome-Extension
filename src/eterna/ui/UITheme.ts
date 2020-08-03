import Fonts from 'eterna/util/Fonts';

export default class UITheme {
    public static readonly colors = {
        background: 0x122944,
        border: 0xC0DCE7
    };

    public static readonly panel = {
        padding: 10,
        borderSize: 1.5
    };

    public static readonly missionIntro = {
        headerHeight: 61,
        maxConstraintWidth: 200
    };

    public static readonly constraints = {
        borderColor: 0x1B588A,
        borderRadius: 5
    };

    public static readonly designBrowser = {
        colors: {
            background: 0x021E46,
            header: 0x043468,
            filterBackground: 0x021E46,
            filterBorder: 0x2F94D1
        },
        rowHeight: Fonts.std(' ', 14).computeLineHeight(), // had been 30,
        headerHeight: 36,
        filterHeight: 50,
        filterPadding: 10,
        dataPadding: 14 + (Fonts.std(' ', 14).computeLineHeight() - 30)
    };
}
