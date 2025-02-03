import { useEffect, useState } from "react"
import { useLocation } from 'react-router-dom';
import { Link } from "react-router";

export default function UpdatePartner() {
  useEffect(() => { document.title = 'Обновить партнера' }, [])
  const location = useLocation();
  const [partner, setPartner] = useState(location.state.partner);

  async function submitHandler(e) {
    e.preventDefault()
    const updPartner = {
      id: partner.id,
      type: e.target.type.value,
      name: e.target.name.value,
      ceo: e.target.ceo.value,
      email: e.target.email.value,
      phone: e.target.phone.value,
      address: e.target.address.value,
      rating: e.target.rating.value
    }
    await window.api.updatePartner(updPartner);
    setPartner(updPartner)
    document.querySelector('form').reset()
  }

  return <div className="form">
    <Link to={'/'}><button>{"<-- Назад"}</button></Link>
    <h1>Обновить партнера</h1>
    <form onSubmit={(e) => submitHandler(e)}>
      <label htmlFor="name">Наименование:</label>
      <input id="name" type="text" required defaultValue={partner.name} />
      <label htmlFor="type">Тип партнера:</label>
      <select name="" id="type" required defaultValue={partner.type} >
        <option value="ЗАО">ЗАО</option>
        <option value="ООО">ООО</option>
        <option value="ОАО">ОАО</option>
        <option value="ПАО">ПАО</option>
      </select>
      <label htmlFor="rating">Рейтинг:</label>
      <input id="rating" type="number" step="1" min='0' max='100' required defaultValue={partner.rating}/>
      <label htmlFor="address">Адрес:</label>
      <input id="address" type="text" required defaultValue={partner.address} />
      <label htmlFor="ceo">ФИО директора:</label>
      <input id="ceo" type="text" required defaultValue={partner.ceo} />
      <label htmlFor="phone">Телефон:</label>
      <input id="phone" type="tel" required defaultValue={partner.phone} />
      <label htmlFor="email">Email компании:</label>
      <input id="email" type="email" required defaultValue={partner.email}/>
      <button type="submit">Обновить партнера</button>
    </form>
  </div>
}