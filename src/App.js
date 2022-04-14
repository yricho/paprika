import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Modal from "./components/Modal";
import Pagination from "./components/Pagination";

function App() {
  const [data, setData] = useState();
  const [selectedItem, setSelectedItem] = useState();
  const [keyword, setKeyword] = useState();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    try {
      fetch("https://api.coinpaprika.com/v1/coins/")
        .then(res => res.json())
        .then(data => {
          setData(data);
        })
    } catch (error) {
      console.log(error);
    }
  }, [])


  const handleFilterData = () => {
    if(keyword){
      const res = data.filter(x => x["name"]?.toLowerCase().includes(keyword));
      setData(res)
    }
  };

  const Post = (props) => {
    const { id, name, symbol, rank, type, is_active } = props.data;
    return (
      <tr className={`p-5 ${props.idx % 2 === 1 ? 'bg-blue-100' : 'bg-white'}`}>
        <td className="p-4 underline cursor-pointer text-blue-500" onClick={() => {
          setShowModal(true);
          setSelectedItem(props.data);
        }}>
          {id}
        </td>
        <td>{name}</td>
        <td>{symbol}</td>
        <td>{rank}</td>
        <td>{type}</td>
        <td>{is_active ? 'True' : 'False'}</td>
        <td>Delete</td>
      </tr>
    );
  }

  return (
    <div className="max-w-screen-lg mx-auto shadow-2 p-4 border rounded-lg">

      <div>
        <input type="text" name="search" placeholder="search" onChange={e => setKeyword(e.target.value)} />
        <button onClick={handleFilterData}>
          Search
        </button>
      </div>
      {
        data &&
        <Pagination
          data={data}
          RenderComponent={Post}
          title="Posts"
          pageLimit={5}
          dataLimit={10}
        />
      }

      <Modal
        isShow={showModal}
        onClose={() => setShowModal(false)} title="Coin Detail">
        {
          selectedItem?.name
        }
      </Modal>
    </div>
  );
}

export default App;
