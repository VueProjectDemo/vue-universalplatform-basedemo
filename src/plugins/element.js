/*
 * @Author:  
 * @Date: 2022-05-13 16:28:28
 * @LastEditors:  
 * @LastEditTime: 2022-06-01 17:21:01
 * @FilePath: /vue-universalplatform/src/plugins/element.js
 * @Description: 
 * 
 * Copyright (c) 2022 by 用户/公司名, All Rights Reserved. 
 */
import Vue from 'vue'
import 'element-ui/lib/theme-chalk/index.css'
import {
  Pagination,
  Dialog,
  Button,
  Menu,
  Submenu,
  MenuItem,
  Input,
  Table,
  TableColumn,
  Form,
  FormItem,
  Switch,
  Select,
  Option,
  DatePicker,
  Icon,
  Row,
  Col,
  Card,
  Container,
  Header,
  Aside,
  Main,
  Footer,
  Loading,
  MessageBox,
  Message, 
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Tag,
  Breadcrumb,
  BreadcrumbItem,
  Popconfirm
} from "element-ui"

Vue.use(Pagination)
Vue.use(Dialog)
Vue.use(Button)
Vue.use(Pagination);
Vue.use(Dialog);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(Input);
Vue.use(Button);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Switch);
Vue.use(Select);
Vue.use(Option);
Vue.use(DatePicker);
Vue.use(Icon);
Vue.use(Row);
Vue.use(Col);
Vue.use(Card);
Vue.use(Container);
Vue.use(Header);
Vue.use(Aside);
Vue.use(Main);
Vue.use(Footer);
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Tag)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Popconfirm)

Vue.use(Loading.directive);

Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$message = Message;