
import { useState } from "react";

export default function Rastreamento() {
  const [codigo, setCodigo] = useState("");
  const [resultado, setResultado] = useState(null);

  const buscarRastreio = async () => {
    const res = await fetch(`https://rastreio-backend-production.up.railway.app/api/rastreio/${codigo}`);
    const data = await res.json();
    setResultado(data);
  };

  return (
    <div style={{ backgroundColor: '#f1f3f5', minHeight: '100vh', padding: '30px 0', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ maxWidth: '700px', backgroundColor: '#fff', margin: 'auto', padding: '40px', borderRadius: '10px', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '30px', color: '#0046ad' }}>Acompanhe sua Entrega</h1>
        <div style={{ display: 'flex', marginBottom: '20px' }}>
          <input
            type="text"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
            placeholder="Digite o código de rastreio"
            style={{ flexGrow: 1, padding: '12px', border: '1px solid #ccc', borderRadius: '5px 0 0 5px' }}
          />
          <button
            onClick={buscarRastreio}
            style={{ backgroundColor: '#0046ad', color: '#fff', border: 'none', padding: '12px 20px', borderRadius: '0 5px 5px 0', cursor: 'pointer' }}
          >
            Rastrear
          </button>
        </div>

        {resultado && (
          <div style={{ marginTop: '20px' }}>
            <p><strong>Nome:</strong> {resultado.nome}</p>
            <p><strong>Produto:</strong> {resultado.produto}</p>
            <p><strong>Endereço:</strong> {resultado.endereco}</p>
            <p style={{ marginTop: '20px', fontWeight: 'bold' }}>Status Atual: <span style={{ color: '#007bff' }}>{resultado.statusAtual}</span></p>
            <div style={{ borderLeft: '4px solid #007bff', marginTop: '20px', paddingLeft: '15px' }}>
              {resultado.historico.map((item, index) => (
                <div key={index} style={{ marginBottom: '15px' }}>
                  <p style={{ margin: 0 }}><strong>{item.dia} dias:</strong> {item.evento}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
