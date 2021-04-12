import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { GetAllUsersAction } from "../actions/loginAction";
import Loader from "../components/Spinner";
import { Container, Row, Col, Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { DeleteUserReducer } from "../reducers/loginReducer";
import { DeleteUserAction } from "../actions/loginAction";

const AllUsersScreen = ({ history }) => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => {
    return state.login;
  });
  const { users, loading } = useSelector((state) => {
    return state.allUsers;
  });
  const { success } = useSelector((state) => {
    return state.deleteUser;
  });
  useEffect(() => {
    if (!userInfo.type) {
      history.push("/");
    }
    dispatch(GetAllUsersAction());
    dispatch({ type: "ADMIN_UPDATE_USER_RESET" });
  }, [dispatch, history, success]);

  return (
    <>
      {loading ? (
        <Loader></Loader>
      ) : (
        <Container>
          <Row className='justify-content-md-center mt-5'>
            <Col md={12} sm={12}>
              <Table striped bordered responsive className='table-sm'>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Admin</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => {
                    return (
                      <tr key={u._id}>
                        <td>{u.name}</td>
                        <td>{u.email}</td>
                        <td>
                          {u.isAdmin ? (
                            <i
                              className='fas fa-check'
                              style={{ color: "green" }}
                            ></i>
                          ) : (
                            <i
                              className='fas fa-times'
                              style={{ color: "red" }}
                            ></i>
                          )}
                        </td>
                        <td>
                          <Link to={"/useredit/" + u._id}>
                            <i className='fas fa-edit'></i>
                          </Link>
                          <Button
                            className='ml-3 btn-sm'
                            variant='danger'
                            onClick={() => dispatch(DeleteUserAction(u._id))}
                          >
                            <i className='fas fa-trash'></i>
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
};

export default AllUsersScreen;
