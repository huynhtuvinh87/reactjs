import React, { Component } from 'react';
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';

class UserList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      currentPageNumber: null,
      numItemsPerPage: null,
      totalItems: null,
      pageCount: null,
      page: null,
      sortType: null,
      sortField: null
    };
    this.sortBy = this.sortBy.bind(this);
  }

  buildHref = (href) => `/users/page/${href}`;
  makeHttpRequestWithPage = async (pageNumber) => {
    fetch(
      `https://gorest.co.in/public-api/users?page=${pageNumber}&_format=json&access-token=KSVemtJhTH4_7XKmZFBwhYB7WAjGDaE68nFw`
    )
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result.result,
            currentPageNumber: result._meta.currentPage,
            numItemsPerPage: result._meta.perPage,
            totalItems: result._meta.totalCount,
            pageCount: result._meta.pageCount
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  };
  componentDidMount() {
    this.makeHttpRequestWithPage(1);
    this.setState({
      page: 0
    });
  }
  handlePageChange = (page) => {
    if (!Number.isNaN(page.selected)) {
      this.props.history.push(`/users/page/${page.selected + 1}`);
      this.makeHttpRequestWithPage(page.selected + 1);
      if (page.selected > 0) {
        this.setState({
          page: (page.selected + 1) * 20 - 20
        });
      } else {
        this.setState({
          page: 0
        });
      }
    }
  };

  sortBy(key) {
    if (this.state.sortField === 'asc_' + key || this.state.sortField == null) {
      this.state.items.sort((a, b) =>
        a[key].toUpperCase() < b[key].toUpperCase() ? 1 : -1
      );
      this.setState({
        sortField: 'desc_' + key
      });
    } else {
      this.state.items.sort((a, b) =>
        a[key].toUpperCase() > b[key].toUpperCase() ? 1 : -1
      );
      this.setState({
        sortField: 'asc_' + key
      });
    }
  }
  render() {
    const { error, isLoaded, items, page } = this.state;
    if (error) {
      return <div className='container'>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div className='container'>Loading...</div>;
    } else {
      return (
        <div className='container-fuild'>
          <div className='content'>
            <h4>
              List Users
              <Link
                to={{ pathname: `/user/create` }}
                className='btn btn-primary btn-sm float-right'
              >
                <small>Add New</small>
              </Link>
            </h4>

            <table className='table'>
              <thead>
                <tr>
                  <th>#</th>
                  <th>
                    Avatar
                  </th>
                  <th>
                    <a
                      onClick={() => this.sortBy('first_name')}
                    >
                      First Name
                    </a>
                  </th>
                  <th>
                    <a
                      onClick={() => this.sortBy('last_name')}
                    >
                      Last Name
                    </a>
                  </th>
                  <th>
                    <a
                      onClick={() => this.sortBy('gender')}
                    >
                      Gender
                    </a>
                  </th>
                  <th>
                    <a
                      onClick={() => this.sortBy('dob')}
                    >
                      Dob
                    </a>
                  </th>
                  <th>Phone</th>
                  <th>Email</th>
                  <th>Website</th>
                  <th>
                    <a
                      onClick={() => this.sortBy('status')}
                    >
                      Status
                    </a>
                  </th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, key) => {
                  return (
                    <tr key={key}>
                      <td>{page + key + 1}</td>
                      <td><img className='avatar' src={item._links.avatar.href}></img></td>
                      <td>
                        <Link to={{ pathname: `/user/${item.id}` }}>
                          {item.first_name}
                        </Link>
                      </td>
                      <td>{item.last_name}</td>
                      <td>{item.gender}</td>
                      <td>{item.dob}</td>
                      <td>{item.phone}</td>
                      <td>{item.email}</td>
                      <td>{item.website}</td>
                      <td>{item.status}</td>
                      <td>
                        <Link
                          to={{ pathname: `/user/update/${item.id}` }}
                          className='btn btn-success btn-sm'
                        >
                          Update
                        </Link>
                        <Link
                          to={{ pathname: `/delete/${item.id}` }}
                          className='btn btn-danger btn-sm'
                        >
                          Delete
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div>
              <ReactPaginate
                previousClassName={'page-item'}
                previousLinkClassName={'page-link'}
                nextClassName={'page-item'}
                nextLinkClassName={'page-link'}
                pageClassName={'page-item'}
                pageLinkClassName={'page-link'}
                previousLabel={'Previous'}
                nextLabel={'Next'}
                breakLabel={'..........'}
                breakClassName={'break-me'}
                pageCount={this.state.pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={this.handlePageChange}
                containerClassName={'pagination'}
                subContainerClassName={'pages pagination'}
                activeClassName={'active'}
                initialPage={parseInt(this.props.match.params.page - 1, 0)}
                hrefBuilder={this.buildHref}
              />
            </div>
          </div>
        </div>
      );
    }
  }
}
export default UserList;
