import { useContext } from "react";
import Alerta from "../../Alerta";
import CategoriaContext from "./ProdutoContext";

function Form() {

    const { objeto, alerta, acaoCadastrar, handleChange, listaCategorias } = useContext(CategoriaContext);

    // Example starter JavaScript for disabling form submissions if there are invalid fields
    (() => {
        'use strict'

        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        const forms = document.querySelectorAll('.needs-validation')

        // Loop over them and prevent submission
        Array.from(forms).forEach(form => {
            form.addEventListener('submit', event => {
                if (!form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()
                }

                form.classList.add('was-validated')
            }, false)
        })
    })()

    return (
        <>
            <div className="modal fade" id="modalEdicao" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">
                                Edição de Produtos</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form id="formulario" onSubmit={acaoCadastrar}
                            className="needs-validation" noValidate>
                            <div className="modal-body">
                                <Alerta alerta={alerta} />
                                <div className="mb-3">
                                    <label htmlFor="txtCodigo"
                                        className="form-label">Código</label>
                                    <input type="number" className="form-control"
                                        id="txtCodigo"
                                        name="codigo"
                                        value={objeto.codigo}
                                        onChange={handleChange} readOnly />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="txtNome"
                                        className="form-label">Nome</label>
                                    <input type="text" className="form-control"
                                        id="txtNome"
                                        name="nome"
                                        value={objeto.nome}
                                        onChange={handleChange} required />
                                    <div className="valid-feedback">Nome OK</div>
                                    <div className="invalid-feedback">Informe o nome</div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="txtDescricao"
                                        className="form-label">Descrição</label>
                                    <input type="text" className="form-control"
                                        id="txtDescricao"
                                        name="descricao"
                                        value={objeto.descricao}
                                        onChange={handleChange} required />
                                    <div className="valid-feedback">Descrição OK</div>
                                    <div className="invalid-feedback">Informe a descrição</div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="txtEstoque"
                                        className="form-label">Estoque</label>
                                    <input type="number" className="form-control"
                                        id="txtEstoque"
                                        name="quantidade_estoque"
                                        value={objeto.quantidade_estoque}
                                        onChange={handleChange} required />
                                    <div className="valid-feedback">Estoque OK</div>
                                    <div className="invalid-feedback">Informe o estoque</div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="txtValor"
                                        className="form-label">Valor</label>
                                    <input type="number" className="form-control"
                                        id="txtValor"
                                        name="valor"
                                        value={objeto.valor}
                                        onChange={handleChange} required />
                                    <div className="valid-feedback">Valor OK</div>
                                    <div className="invalid-feedback">Informe o Valor</div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="txtDataCadastro"
                                        className="form-label">Data de cadastro</label>
                                    <input type="date" className="form-control"
                                        id="txtDataCadastro"
                                        name="data_cadastro"
                                        value={objeto.data_cadastro}
                                        onChange={handleChange} required />
                                    <div className="valid-feedback">Data de cadastro OK</div>
                                    <div className="invalid-feedback">Informe a data de cadastro</div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="selectAtivo"
                                        className="form-label">Ativo</label>
                                    <select
                                        required
                                        className="form-control"
                                        id="selectAtivo"
                                        value={objeto.ativo}
                                        name="ativo"
                                        onChange={handleChange}>
                                        <option disable="true" value="">(Selecione se está ativo)</option>
                                        <option value="true">SIM</option>
                                        <option value="true">NÃO</option>
                                    </select>
                                    <div className="valid-feedback">Ativo OK</div>
                                    <div className="invalid-feedback">Informe se está ativo</div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="selectCategoria"
                                        className="form-label">categoria</label>
                                    <select
                                        required
                                        className="form-control"
                                        id="selectCategoria"
                                        value={objeto.categoria}
                                        name="categoria"
                                        onChange={handleChange}>
                                        <option disable="true" value="">(Selecione a categoria)</option>
                                        {listaCategorias.map((cat) => (
                                            <option key={cat.codigo} value={cat.codigo}>
                                                {cat.nome}
                                            </option>
                                        ))}
                                    </select>
                                    <div className="valid-feedback">Categoria OK</div>
                                    <div className="invalid-feedback">Informe a categoria</div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                                <button type="submit" className="btn btn-success">Salvar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Form;