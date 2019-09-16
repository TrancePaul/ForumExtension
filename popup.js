import {Grid, Model, Store, CollectionFilter} from './lib/grid.module.js';

const devNames = [
    'mats',
    'Animal',
    'arcady',
    'goran',
    'johan.isaksson',
    'Maxim Gorkovsky',
    'maximgb',
    'nickolay',
    'pmiklashevich',
    'Terence',
    'saki',
    'sergey.maltsev'
];

class ForumPost extends Model {
    static get fields() {
        return [
            'title',
            'user',
            'link',
            { name : 'date', type : 'date', dateFormat : 'YYYY-MM-DD HH:mm' }
        ];
    }
}

let store = new Store({
    modelClass : ForumPost,
    filters    : {
        filterBy : rec => !devNames.includes(rec.user)
    }
});

const grid = new Grid({
    store,
    readOnly : true,
    appendTo : 'container',
    columns  : [{
        text  : 'Id',
        field : 'id',
        width : 60
    }, {
        text  : 'Title',
        field : 'title',
        flex  : 1
    }, {
        text  : 'User',
        field : 'user',
        width : 130
    }, {
        text   : 'Date',
        field  : 'date',
        type   : 'date',
        format : 'DD/MM HH:mm',
        width  : 90
    }, {
        text    : 'Link',
        width   : 24,
        type    : 'widget',
        widgets : [{
            type     : 'button',
            icon     : 'b-fa b-fa-link',
            cls      : 'b-blue b-raised',
            onAction : ({ source : btn }) => {
                window.open(btn.cellInfo.record.link);
            }
        }]
    }]
});

chrome.tabs.query({ active : true, currentWindow : true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { type : 'getData' }, function (data) {
        store.data = data;
    });
});
