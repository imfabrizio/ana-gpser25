import { useEffect, useState } from "react";

function RegistrationForm() {
  const [formData, setFormData] = useState({
    nome: "",
    cognome: "",
    dataNascita: "",
    luogoNascita: "",
    codiceFiscale: "",
    comitato: "",
    regione: "",
    ruolo: "",
    intolleranze: "",
    altreEsigenze: "",
    pernottamento: false,
    patenteCRI45: false,
    documento: null,
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else if (type === "file") {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let documentoUrl = "";
    if (formData.documento) {
      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: formData.documento,
      });
      const { url } = await uploadRes.json();
      documentoUrl = url;
    }

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...formData, documentoUrl }),
    });

    if (res.ok) {
      alert("Registrazione completata");
    } else {
      alert("Errore durante la registrazione");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4">
      <input name="nome" placeholder="Nome" onChange={handleChange} required />
      <input name="cognome" placeholder="Cognome" onChange={handleChange} required />
      <input name="dataNascita" type="date" onChange={handleChange} required />
      <input name="luogoNascita" placeholder="Luogo di nascita" onChange={handleChange} required />
      <input name="codiceFiscale" placeholder="Codice Fiscale (solo Team)" onChange={handleChange} />
      <input name="comitato" placeholder="Comitato" onChange={handleChange} required />
      <input name="regione" placeholder="Regione" onChange={handleChange} required />
      <input name="ruolo" placeholder="Ruolo" onChange={handleChange} required />
      <textarea name="intolleranze" placeholder="Intolleranze alimentari" onChange={handleChange} />
      <textarea name="altreEsigenze" placeholder="Altre esigenze" onChange={handleChange} />
      <label>
        <input type="checkbox" name="pernottamento" onChange={handleChange} />
        Richiesta pernottamento
      </label>
      <label>
        <input type="checkbox" name="patenteCRI45" onChange={handleChange} />
        Ha patente CRI 4/5
      </label>
      <label>
        Documento CI:
        <input type="file" name="documento" onChange={handleChange} />
      </label>
      <button type="submit">Invia registrazione</button>
    </form>
  );
}

export default RegistrationForm;
