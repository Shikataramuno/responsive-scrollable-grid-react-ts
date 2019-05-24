import * as React from 'react';
import {Row, Col, Form, ProgressBar} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Member from './model/Member';
import SortOrders from './model/SortOrders';
import './MemberList.css';
import { FormControl } from 'react-bootstrap';

interface State {
  members: Member[],
  sortOrders: SortOrders,
  sortKey: string
}
interface Props {

}
interface DHeadProps {
  sortKey: string;
  sortOrders: SortOrders;
  filter(event: React.FormEvent): void;
  sortBy(name: string, event: React.MouseEvent): void; 
}
interface DListProps {
  members: Member[];
  handleAdminChanged(member: Member): void;
}
export default class MemberList extends React.Component<Props, State> {
  columns: string[] = ['id', 'name', 'admin', 'address', 'progress']
  memberList: Member[] = []
  constructor(props: Props) {
    super(props);
    this.state = {
      members: [],
      sortOrders: new SortOrders({id: 1, name: 1, admin: 1, progress: 1, address: 1}),
      sortKey: ""
    }
   }

  filter = (event: React.FormEvent) => {
    const filter: string = (event.target as HTMLInputElement).value;
    let members: Member[] = this.memberList;
    members = members.filter((member: Member) => {
      return member.isIncluded(filter)
    });
    this.setState({members: members})
  }
  sortBy = (name: string, e: React.MouseEvent) => {
    let order: number = this.state.sortOrders.getOrder(name);
    console.log('order : ' + order);
    let members: Member[] = this.state.members;
    members = members.slice().sort((a: Member,b: Member) => {
      const aVal: string = a.getValue(this.state.sortKey);
      const bVal: string = b.getValue(this.state.sortKey);
      return (aVal === bVal ? 0 : aVal < bVal ? -1 : 1) * order;
    });
    this.state.sortOrders.selectKey(name);
    this.setState({sortKey: name});
    this.setState({members: members})
  }
  handleAdminChanged = (member: Member) => {
    console.log(member);
    let list: Member[] = this.state.members;
    const target: Member = list.find((rec) => {
      return rec.id === member.id
    })!
    target!.admin = !target!.admin;
    this.setState({members: list})
  }
  dhead = (props: DHeadProps) => {
    return (
      <div className="pc table-row header">
        <Row>
          <Form.Label className="title" >メンバ一覧 </Form.Label>
        </Row>
        <Row className='query-box'>
          <Col xs={2}>
            <Form.Control as="input"
              type="text"
              id="search"
              className="filter"
              placeholder="フィルタ文字列"
              onChange={(e: React.FormEvent) => props.filter(e)}/>
          </Col>
          <Col xs={10}>
          </Col>
        </Row>
        <div className="wrapper attributes header">
          {
            this.columns.map((name: string, col: number) => {
              const className: string = props.sortKey === name ? "active " + name : name
              const arrow =
                props.sortKey === name ? 
                (props.sortOrders.getOrder(name) > 0? <span className={"arrow asc"}></span> : <span className="arrow dsc"></span>) :
                "";
              return (
                <div className={className}
                  key={col}
                  onClick={(e: React.MouseEvent) => props.sortBy(name, e)}>
                  {name}
                  {arrow}
                </div>
              )
            })
          }
        </div>
      </div>
    );   
  }
  dlist = (props: DListProps) => {
    return (
      <div className="data-field">
        {
          props.members.map((member: Member, row: number) => {
            return (
             <div className="table-row wrapper attributes data" key={row}>{
                this.columns.map((name: string, idx: number) => {
                  if(name === "admin") {
                    return (
                      <div className={name} key={idx}>
                        <Form.Check
                          type="checkbox"
                          checked={member.isAdmin()}
                          onChange={() => props.handleAdminChanged(member)}
                        />
                      </div>
                    )
                  } else if(name === "progress") {
                    return (
                      <div className={name} key={idx}>
                        <ProgressBar
                          variant="success"
                          now={member.getProgress()}
                          label={`${member.getValue(name)}%`}
                        />
                      </div>
                    )
                  } else {
                    return (
                      <div className={name} key={idx}>
                        {member.getValue(name)}
                      </div>
                    )
                  }
                })
              }</div>
            );
          })
        }
      </div>
    );
  }
  list = () => {
    return (
      <div className="container-fluid">
        <this.dhead
          sortKey={this.state.sortKey}
          sortOrders={this.state.sortOrders}
          filter= {this.filter}
          sortBy= {this.sortBy}
        />
        <this.dlist
          members = {this.state.members}
          handleAdminChanged={this.handleAdminChanged}
        />
      </div>
    );
  }
  render () {
    return <this.list/>
  }
  componentDidMount () {
    let list: Member[] = [
      new Member({id: 1, name: 'aaaa', admin: true, progress: 10, address: 'aaaa@shikataramuno.com'}),
      new Member({id: 2, name: 'bbbb', admin: true, progress: 20, address: 'bbbb@shikataramuno.com'}),
      new Member({id: 3, name: 'cccc', admin: false, progress: 30, address: 'cccc@shikataramuno.com'}),
      new Member({id: 4, name: 'dddd', admin: false, progress: 40, address: 'dddd@shikataramuno.com'}),
      new Member({id: 5, name: 'eeee', admin: false, progress: 50, address: 'eeee@shikataramuno.com'}),
      new Member({id: 6, name: 'ffff', admin: false, progress: 60, address: 'ffff@shikataramuno.com'}),
      new Member({id: 7, name: 'gggg', admin: false, progress: 70, address: 'gggg@shikataramuno.com'}),
      new Member({id: 8, name: 'hhhh', admin: false, progress: 80, address: 'hhhh@shikataramuno.com'}),
      new Member({id: 9, name: 'iiii', admin: false, progress: 90, address: 'iiii@shikataramuno.com'}),
      new Member({id: 10, name: 'jjjj', admin: false, progress: 11, address: 'jjjj@shikataramuno.com'}),
      new Member({id: 11, name: 'kkkk', admin: false, progress: 22, address: 'kkkk@shikataramuno.com'}),
      new Member({id: 12, name: 'llll', admin: false, progress: 33, address: 'llll@shikataramuno.com'}),
      new Member({id: 13, name: 'mmmm', admin: false, progress: 44, address: 'mmmm@shikataramuno.com'}),
      new Member({id: 14, name: 'nnnn', admin: false, progress: 55, address: 'nnnn@shikataramuno.com'}),
      new Member({id: 15, name: 'oooo', admin: false, progress: 66, address: 'oooo@shikataramuno.com'}),
      new Member({id: 16, name: 'pppp', admin: false, progress: 77, address: 'pppp@shikataramuno.com'}),
      new Member({id: 17, name: 'qqqq', admin: false, progress: 88, address: 'qqqq@shikataramuno.com'}),
      new Member({id: 18, name: 'rrrr', admin: false, progress: 99, address: 'rrrr@shikataramuno.com'}),
      new Member({id: 19, name: 'ssss', admin: false, progress: 10, address: 'ssss@shikataramuno.com'}),
      new Member({id: 20, name: 'tttt', admin: false, progress: 20, address: 'tttt@shikataramuno.com'}),
      new Member({id: 21, name: 'uuuu', admin: false, progress: 30, address: 'uuuu@shikataramuno.com'}),
      new Member({id: 22, name: 'vvvv', admin: false, progress: 40, address: 'vvvv@shikataramuno.com'}),
      new Member({id: 23, name: 'wwww', admin: false, progress: 50, address: 'wwww@shikataramuno.com'}),
      new Member({id: 24, name: 'xxxx', admin: false, progress: 60, address: 'xxxx@shikataramuno.com'}),
      new Member({id: 25, name: 'yyyy', admin: false, progress: 70, address: 'yyyy@shikataramuno.com'}),
      new Member({id: 26, name: 'zzzz', admin: true, progress: 80, address: 'zzzz@shikataramuno.com'})
    ];
    this.setState({members: list});
  }
}
  