export interface ISubmenu {
    menuId: number;
    menuName: string;
    linkUrl: string;
    linkImage: string;
    // displayOrder: number;
  }
  
  export interface IMenu {
    menuId: number;
    menuName: string;
    linkUrl: string;
    linkImage: string;
    submenu: ISubmenu[];
  }