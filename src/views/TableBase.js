export default class TableBase {
    constructor(api, columns, btns, searchModel, tableControl) {
        this.api = api;
        this.columns = columns;
        this.btns = btns;
        this.searchModel = searchModel;
        const defalt = this.defaultTableControl();
        if (tableControl) {
            for (const [key, value] of Object.entries(tableControl)) {
                defalt[key] = tableControl[key]
            }
        }
        this.tableControl = defalt;
        this.sort = null;
    }

    defaultTableControl() {
        return {
            style: {},
            emptyText: "無資料",
            stripe: true,
            selectable: false,
            highlightCurrentRow: true,
            showHeader: false
        }
    }
    /*
    新增排序物件
    */
    setSort({ prop = null, order = null } = {}) {
        if (prop == null || order == null) {
            this.clearSort();
        } else {
            this.sort = { prop, order };
        }
    }
    /*
    清除排序物件
    */
    clearSort() {
        this.sort = null;
    }
}