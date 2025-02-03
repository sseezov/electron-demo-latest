import { useEffect, useState } from "react"
import { Link } from "react-router";
import { useNavigate } from "react-router-dom";
import logo from './assets/logo.png'

function App() {
  const navigate = useNavigate();
  const [partners, setPartners] = useState([]);
  useEffect(() => {
    (async () => {
      const res = await window.api.getPartners()
      setPartners(res)
    })()
  }, [])

  return (
    <>
      <div className="page-heading">
        <img className="page-logo" src={logo} alt="" />
        <h1>Партнеры</h1>
      </div>
      <ul className="partners-list">
        {partners.map((partner) => {
          return <li className="partner-card" key={partner.id} onClick={() => { navigate('/update', { state: { partner } }) }}>
            <div className="partner-data">
              <p className="card_heading">{partner.organization_type} | {partner.name}</p>
              <div className="partner-data-info">
                <p>{partner.ceo}</p>
                <p>{partner.phone}</p>
                <p>Рейтинг: {partner.rating}</p>
              </div>
            </div>
            <div className="partner-sale partner-data card_heading">
              {partner.discount}%
            </div>
          </li>
        })}
      </ul>

      <Link to={'/create'}>
        <button>
          Создать партнера
        </button>
      </Link>
    </>
  )
}

export default App
