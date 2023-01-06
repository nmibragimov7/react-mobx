import {makeAutoObservable} from "mobx";

class Filter {
    filter = "all";
    constructor() {
        makeAutoObservable(this);
    }
    setFilter(filter) {
        this.filter = filter;
    }
}
export default new Filter();
