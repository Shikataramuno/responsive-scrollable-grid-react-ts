import * as React from 'react';

interface MemberProps {
  id: number;
  name: string;
  address: string;
  admin: boolean;
  progress: number;
}

export default class Member extends React.Component<MemberProps>{
  id: number = -1;
  name: string = '';
  address: string = '';
  admin: boolean = false;
  progress: number = 0;

  constructor(props: MemberProps)
  {
      super(props)
      this.id = props.id;
      this.name = props.name;
      this.admin = props.admin;
      this.address = props.address;
      this.progress = props.progress;
  }

  isIncluded(str: string): boolean {
    return String(this.id).toLowerCase().indexOf(str) > -1 ||
     this.name.toLowerCase().indexOf(str) > -1 ||
     this.address.toLowerCase().indexOf(str) > -1;
  }

  getValue(key: string): string {
    /*
    let str: string = '';
    if (key === 'id') {
      str = String(this.id);
    } else if (key === 'name') {
      str = this.name;
    } else if (key === 'address') {
      str = this.address;
    } else {
      str = 'Unknown key';
    }
    // return str;
    */
    return (this as any)[key];
  }

  isAdmin(): boolean {
    return this.admin;
  }
  getProgress(): number {
    return this.progress;
  }
}
