import React from 'react';
import axios from 'axios';
import {Blog} from './Interfaces';

function App() {
  const [blogs, setBlogs] = React.useState<Blog[]>([]); 
  const [loading, setLoading] = React.useState<boolean>(false);


  const fetchBlogs = () => {
    setLoading(true); 
    axios.get('/api/blog')
      .then(response => {
        setBlogs(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error al consumir la API:', error);
        setLoading(false);
      });
  };

  return (
    <div className="contanier-fluid">
      
      <h1 className="text-center mb-4">Listado de Blogs</h1>

     

      <div className="row justify-content-center">
        <div className="col-10">
          <table className="table table-hover table-bordered table-striped text-center" style={{maxHeight: '400px', overflowY: 'auto'}}>
            <thead className="thead-dark">
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Título</th>
                <th scope="col">Autor</th>
                <th scope="col">Categoría</th>
              </tr>
            </thead>
            <tbody>
              {blogs.length > 0 ? (
                blogs.map(blog => (
                  <tr key={blog.id}>
                    <td>{blog.id}</td>
                    <td>{blog.title}</td>
                    <td>{blog.author}</td>
                    <td>{blog.category}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="text-muted">
                    No hay datos disponibles. Tiene que presionar "Consultar" para cargar los blogs.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <div className="text-center mb-4">
        <button className="btn btn-lg btn-primary" onClick={fetchBlogs}>
          {loading ? (
            <>
              <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              Cargando...
            </>
          ) : (
            'Consultar'
          )}
        </button>
      </div>
        </div>
      </div>

    </div>
  );
}

export default App;