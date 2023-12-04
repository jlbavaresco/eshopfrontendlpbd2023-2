import { useEffect, useState } from "react";

const Alerta = ({ alerta }) => {

    const [exibir, setExibir] = useState(false);

    useEffect(() => {
        setExibir(true);
        setTimeout(() => {
            setExibir(false);
        }, 3000); // após 3 segundos torna false o exibir
    }, [alerta]);

    return (
        <div>
            {(alerta.message.length > 0 && exibir) &&
                <div className={
                    alerta.status === 'error'
                        ? 'alert alert-danger'
                        : 'alert alert-primary'
                } role="alert">
                    {alerta.message}
                </div>
            }
        </div>
    )
}

export default Alerta;