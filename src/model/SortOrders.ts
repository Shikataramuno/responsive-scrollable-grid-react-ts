import * as React from 'react';

interface SortOrdersProps {
  id: number;
  name: number;
  address: number;
  progress: number;
  admin: number;
}

export default class SortOrders extends React.Component<SortOrdersProps> {
  id = 1;
  name = 1;
  address = 1;
  progress = 1;
  admin = 1;

  constructor(props: SortOrdersProps) {
    super(props);
    this.id = props.id;
    this.name = props.name;
    this.address = props.address;
    this.admin = props.admin;
  }
  
  selectKey(key: string) {
    switch (key) {
      case 'id':
        this.id *= -1;
        break;
      case 'name':
        this.name *= -1;
        break;
      case 'address':
        this.address *= -1;
        break;
      case 'progress':
        this.progress *= -1;
        break;
      case 'admin':
        this.admin *= -1;
        break;
    }
  }
  getOrder(key: string): number {
    /*
    let order: number = 1;
    if (key === 'id') {
      order = this.id;
    } else if (key === 'name') {
      order = this.name;
    } else {
      order = this.address;
    }
    return order;
    */
    return (this as any)[key];
  }
}
