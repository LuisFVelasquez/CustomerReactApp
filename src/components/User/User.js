import React from 'react';
import {
  Alert,
  Table,
  Button,
  Container,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  ModalFooter,
  Spinner
} from "reactstrap";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router";
import { getAuth  } from "firebase/auth";
import "./User.css";

const data = [
];

const BASE_URL = process.env.REACT_APP_API_BASE_URL;
const PATH_CUSTOMERS = process.env.REACT_APP_API_CUSTOMERS_PATH;

const User = () => {

  const auth = getAuth();
  const [modalActualizar, setModalActualizar] = React.useState(false);
  const [modalInsertar, setModalInsertar] = React.useState(false);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [errors, setErrors] = React.useState(null);
  const [newVal, setNewVal] = React.useState(0);
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = React.useState("");
  const history = useHistory();


  const logout = () => {
    auth.signOut().then(function() {
      // Sign-out successful.
      console.log("loggedout");
    }).catch((error) =>  {
      // An error happened.
      const errorCode = error.code;
        const errorMessage = error.message;
    });
  };

  const [usuario, setUsuario] = React.useState({
    data: data,
    form: {
      email: "",
      phoneNumber: "",
      address: "",
      firstName: "",
      lastName: ""
    }
  });

  React.useEffect(() => {
    fetch(`${BASE_URL}${PATH_CUSTOMERS}`)
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setUsuario({
            ...usuario,
            data: result
          });
        },
        (error) => {
          setIsLoaded(true);
          setErrors(error);
        }
      )
  }, [newVal]);

  React.useEffect(() => {
    if (loading) return;
    if (!user) return history.replace("/");
  }, [user, loading]);

  const handleChange = (e) => {
    setUsuario((prevState) => ({
      ...prevState,
      form: {
        ...prevState.form,
        [e.target.name]: e.target.value,
      }
    }));
  };

  const mostrarModalActualizar = (e) => {
    let arregloUsuarios = usuario.data;
    let userToModify;
    arregloUsuarios.map((registro) => {
      if (e.target.id === registro._id) {
        userToModify = registro;
      }
    });
    setUsuario({
      ...usuario,
      form: userToModify
    });
    setModalActualizar(true);
  };

  const cerrarModalActualizar = () => {
    setModalActualizar(false);
  };

  const mostrarModalInsertar = () => {
    setModalInsertar(true);
  };

  const cerrarModalInsertar = () => {
    setModalInsertar(false);
  };

  const editar = () => {
    let usuarioAModificar = { ...usuario.form };
    actualizarCustomer(usuarioAModificar);
    setModalActualizar(false);
    setNewVal(newVal + 1);
  };

  const eliminar = (e) => {
    let arregloUsuarios = usuario.data;
    arregloUsuarios.map((registro) => {
      if (e.target.id === registro._id) {
        let opcion = window.confirm("¿Está seguro que desea eliminar el valor " + registro.firstName + "?");
        if (opcion) {
          borrarCustomer(registro._id);
        }
      }
    });
    setNewVal(newVal + 1);
  };

  const insertar = () => {
    let usuarioACrear = { ...usuario.form };
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(usuarioACrear)
    };
    fetch(`${BASE_URL}${PATH_CUSTOMERS}`, requestOptions)
      .then(
        (response) => {
          response.json();
          setNewVal(newVal + 1);
        },
        (error) => {
          setIsLoaded(true);
          setErrors(error);
        })
    setModalInsertar(false);
  }

  const borrarCustomer = (id) => {
    const requestOptions = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    };
    fetch(`${BASE_URL}${PATH_CUSTOMERS}/${id}`, requestOptions)
      .then(result => result.json())
      .then(
        (result) => {
          setNewVal(newVal + 1);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  const actualizarCustomer = (customer) => {
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(customer)
    };
    fetch(`${BASE_URL}${PATH_CUSTOMERS}/${customer._id}`, requestOptions)
      .then(result => result.json())
      .then(
        (result) => {
          setNewVal(newVal + 1);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  if (error) {
    return <Alert color="danger">
      Error: {error.message}
    </Alert>;
  } else {
    return (

      <>
        <Container>
          <div>
            <div>
              {/* <div>Current User: {user.email}</div> */}
              <Button color="danger" onClick={logout}>Logout</Button>
            </div>
          </div>
          <br />
          <Button color="success" onClick={mostrarModalInsertar}>Crear</Button>
          <br />
          <br />
          <Table>
            <thead>
              <tr>
                <th>Email</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Dirección</th>
                <th>Telefóno</th>
                <th>Acción</th>
              </tr>
            </thead>

            <tbody>
              {usuario.data.map((dato) => (
                <tr key={dato._id}>
                  <td>{dato.email}</td>
                  <td>{dato.firstName}</td>
                  <td>{dato.lastName}</td>
                  <td>{dato.address}</td>
                  <td>{dato.phoneNumber}</td>
                  <td>
                    <Button
                      color="primary" id={dato._id}
                      onClick={mostrarModalActualizar}
                    >
                      Editar
                    </Button>{" "}
                    <Button id={dato._id} color="danger" onClick={eliminar}>Eliminar</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>

        <Modal isOpen={modalActualizar}>
          <ModalHeader>
            <div><h3>Actualizar Usuario {usuario.form._id}</h3></div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>
                Id:
              </label>

              <input
                className="form-control"
                readOnly
                type="text"
                value={usuario.form._id}
              />
            </FormGroup>

            <FormGroup>
              <label>
                Email:
              </label>
              <input
                className="form-control"
                name="email"
                type="text"
                onChange={handleChange}
                value={usuario.form.email}
                required
              />
            </FormGroup>

            <FormGroup>
              <label>
                Nombre:
              </label>
              <input
                className="form-control"
                name="firstName"
                type="text"
                onChange={handleChange}
                value={usuario.form.firstName}
              />
            </FormGroup>

            <FormGroup>
              <label>
                Apellido:
              </label>
              <input
                className="form-control"
                name="lastName"
                type="text"
                onChange={handleChange}
                value={usuario.form.lastName}
              />
            </FormGroup>

            <FormGroup>
              <label>
                Dirección:
              </label>
              <input
                className="form-control"
                name="address"
                type="text"
                onChange={handleChange}
                value={usuario.form.address}
              />
            </FormGroup>
            <FormGroup>
              <label>
                Telefóno:
              </label>
              <input
                className="form-control"
                name="phoneNumber"
                type="text"
                onChange={handleChange}
                value={usuario.form.phoneNumber}
              />
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button
              color="primary"
              onClick={editar}
            >
              Actualizar
            </Button>
            <Button
              className="btn btn-danger"
              onClick={cerrarModalActualizar}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>



        <Modal isOpen={modalInsertar}>
          <ModalHeader>
            <div><h3>Insertar Usuario</h3></div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>
                Email:
              </label>
              <input
                className="form-control"
                name="email"
                type="text"
                onChange={handleChange}
                required
              />
            </FormGroup>

            <FormGroup>
              <label>
                Nombre:
              </label>
              <input
                className="form-control"
                name="firstName"
                type="text"
                onChange={handleChange}
              />
            </FormGroup>

            <FormGroup>
              <label>
                Apellido:
              </label>
              <input
                className="form-control"
                name="lastName"
                type="text"
                onChange={handleChange}
              />
            </FormGroup>

            <FormGroup>
              <label>
                Dirección:
              </label>
              <input
                className="form-control"
                name="address"
                type="text"
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <label>
                Telefóno:
              </label>
              <input
                className="form-control"
                name="phoneNumber"
                type="text"
                onChange={handleChange}
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              onClick={insertar}
            >
              Insertar
            </Button>
            <Button
              className="btn btn-danger"
              onClick={cerrarModalInsertar}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}
export default User;
