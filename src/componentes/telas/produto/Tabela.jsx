import { useContext } from "react";
import CategoriaContext from "./ProdutoContext";
import Alerta from "../../Alerta";

function Tabela() {

    // importo do contexto o que eu preciso usar
    const { listaObjetos, alerta, remover, novoObjeto, editarObjeto } = useContext(CategoriaContext);

    return (
        <div style={{ padding: '20px' }}>
            <h1>Produtos</h1>
            <button type="button" class="btn btn-primary" data-bs-toggle="modal"
                data-bs-target="#modalEdicao" onClick={() => novoObjeto()}>
                Novo
            </button>
            <Alerta alerta={alerta} />
            {listaObjetos.length === 0 && <h1>Nenhum registro encontrado</h1>}
            {listaObjetos.length > 0 && (
                <div className="table-responsive">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col" style={{ textAlign: 'center' }}>Ações</th>
                                <th scope="col">Código</th>
                                <th scope="col">Nome</th>
                                <th scope="col">Descrição</th>
                                <th scope="col">Estoque</th>
                                <th scope="col">Ativo</th>
                                <th scope="col">Valor</th>
                                <th scope="col">Data Cadastro</th>
                                <th scope="col">Categoria</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                listaObjetos.map(objeto => (
                                    <tr key={objeto.codigo}>
                                        <td align="center">
                                            <button className="btn btn-info"
                                                data-bs-toggle="modal"
                                                data-bs-target="#modalEdicao"
                                                onClick={() => editarObjeto(objeto.codigo)}>
                                                <i className="bi bi-pencil-square"></i>
                                            </button>
                                            <button className="btn btn-danger"
                                                onClick={() => remover(objeto)}>
                                                <i className="bi bi-trash"></i>
                                            </button>
                                        </td>
                                        <th scope="row">{objeto.codigo}</th>
                                        <td>{objeto.nome}</td>
                                        <td>{objeto.descricao}</td>
                                        <td>{objeto.quantidade_estoque}</td>
                                        <td>{objeto.ativo ? 'SIM' : 'NÃO'}</td>
                                        <td>{objeto.valor}</td>
                                        <td>{objeto.data_cadastro}</td>
                                        <td>{objeto.categoria_nome}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            )}

        </div>
    )
}

export default Tabela;