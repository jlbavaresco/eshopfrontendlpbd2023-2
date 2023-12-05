import { useState, useEffect } from "react";
import ProdutoContext from "./ProdutoContext";
import Tabela from "./Tabela";
import Form from "./Form";

function Produto() {

    const [listaObjetos, setListaObjetos] = useState([]);
    const [listaCategorias, setListaCategorias] = useState()
    const [alerta, setAlerta] = useState({ status: "", message: "" });

    // consulta na api 

    const recuperaProdutos = async () => {
        await fetch(`${process.env.REACT_APP_ENDERECO_API}/produtos`)
            .then(response => response.json())
            .then(json => setListaObjetos(json))
            .catch(err => console.log('Erro: ' + err))
    }    
    const recuperaCategorias = async () => {
        await fetch(`${process.env.REACT_APP_ENDERECO_API}/categorias`)
            .then(response => response.json())
            .then(json => setListaCategorias(json))
            .catch(err => console.log('Erro: ' + err))
    }


    const remover = async objeto => {
        if (window.confirm('Deseja remover este objeto?')) {
            try {
                await
                    fetch(`${process.env.REACT_APP_ENDERECO_API}/produtos/${objeto.codigo}`,
                        { method: "DELETE" })
                        .then(response => response.json())
                        .then(json => setAlerta({
                            status: json.status,
                            message: json.message
                        }));
                recuperaProdutos();
            } catch (err) {
                console.log('Erro: ' + err);
            }
        }
    }

    // método que vai ser executado toda vez que o componente é renderizado
    useEffect(() => {
        recuperaCategorias();
        recuperaProdutos();
    }, []);

    const [editar, setEditar] = useState(false);
    const [objeto, setObjeto] = useState({
        codigo: 0,
        nome: "",
        descricao: "",
		quantidade_estoque: "",
		valor: "",
		ativo: "",
        data_cadastro: new Date().toISOString().slice(0, 10),
        categoria: ""
    });

    const novoObjeto = () => {
        setEditar(false);
        setAlerta({ status: "", message: "" });
        setObjeto({
            codigo: 0,
            nome: "",
            descricao: "",
            quantidade_estoque: "",
            valor: "",
            ativo: "",
            data_cadastro: new Date().toISOString().slice(0, 10),
            categoria: ""
        });
    }

    const editarObjeto = async codigo => {
        setEditar(true);
        setAlerta({ status: "", message: "" });
        await fetch(`${process.env.REACT_APP_ENDERECO_API}/produtos/${codigo}`)
            .then(response => response.json())
            .then(data => setObjeto(data))
            .catch(err => console.log(err));
    }

    const acaoCadastrar = async e => {
        e.preventDefault();
        const metodo = editar ? "PUT" : "POST";
        try {
            await fetch(`${process.env.REACT_APP_ENDERECO_API}/produtos`,
                {
                    method: metodo,
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(objeto)
                }).then(response => response.json())
                  .then(json => {
                        setAlerta({status : json.status, 
                        message : json.message});
                        setObjeto(json.objeto);
                        if (!editar){
                            setEditar(true);
                        }
                  })
        } catch (err) {
            console.log(err);
        }
        recuperaProdutos();
    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setObjeto({...objeto, [name] : value});
    }


    return (
        <ProdutoContext.Provider value={
            { listaObjetos, alerta, remover,
            objeto, novoObjeto, editarObjeto, acaoCadastrar, handleChange, listaCategorias }
        }>
            <Tabela />
            <Form/>
        </ProdutoContext.Provider>
    )


}

export default Produto;
