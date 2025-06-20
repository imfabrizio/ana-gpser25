import { useState } from "react";

export default function RegistrationForm() {
  const [formData, setFormData] = useState({
    nome: "",
    cognome: "",
    email: "",
    cf: "",
    dataNascita: "",
    luogoNascita: "",
    ruolo: "",
    allergie: "",
    richiestaPernottamento: false,
    patente4: false,
    documento: null,
  });

  const handleChange = (e) => {
    const { name, type, value, checked, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : type === "file"
          ? files[0]
          : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Dati inviati:", formData);
    alert("Dati inviati con successo!");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-xl rounded-2xl max-w-xl w-full p-6">
        <div className="flex flex-col items-center">
          <img src="/logo-cri.png" alt="Logo Croce Rossa" className="h-20 mb-4" />
          <h1 className="text-2xl font-bold text-red-600 mb-6 text-center">
            Iscrizione Gara di Primo Soccorso
          </h1>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input name="nome" type="text" required placeholder="Nome" className="input" onChange={handleChange} />
            <input name="cognome" type="text" required placeholder="Cognome" className="input" onChange={handleChange} />
            <input name="email" type="email" required placeholder="Email" className="input" onChange={handleChange} />
            <input name="cf" type="text" required placeholder="Codice Fiscale" className="input" onChange={handleChange} />
            <input name="dataNascita" type="date" required className="input" onChange={handleChange} />
            <input name="luogoNascita" type="text" required placeholder="Luogo di nascita" className="input" onChange={handleChange} />
            <input name="ruolo" type="text" placeholder="Ruolo (es. Squadra, Autista...)" className="input" onChange={handleChange} />
            <input name="allergie" type="text" placeholder="Allergie o intolleranze" className="input" onChange={handleChange} />
          </div>

          <div className="flex items-center space-x-2">
            <input name="richiestaPernottamento" type="checkbox" onChange={handleChange} />
            <label>Richiede pernottamento</label>
          </div>

          <div className="flex items-center space-x-2">
            <input name="patente4" type="checkbox" onChange={handleChange} />
            <label>Ha patente tipo 4</label>
          </div>

          <div>
            <label className="block mb-1">Documento di identità (PDF/JPG)</label>
            <input name="documento" type="file" accept=".pdf,.jpg,.jpeg,.png" className="input" onChange={handleChange} />
          </div>

          <button type="submit" className="w-full bg-red-600 text-white py-2 rounded-xl hover:bg-red-700">
            Invia Iscrizione
          </button>
        </form>
      </div>
    </div>
  );
}
