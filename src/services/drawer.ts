import { Drawer } from 'native-base';
import React from 'react';

const drawerRef = React.createRef<Drawer>();

class DrawerController {
  static open(): void {
    drawerRef.current?._root.open();
  }

  static close(): void {
    drawerRef.current?._root.close();
  }
}

export default DrawerController;
export { drawerRef };
