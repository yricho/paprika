import { useState } from "react";

function Pagination({ data, RenderComponent, pageLimit, dataLimit }) {
   console.log(data);
   const [pages] = useState(Math.round(data.length / dataLimit));
   const [currentPage, setCurrentPage] = useState(1);

   function goToNextPage() {
      setCurrentPage((page) => page + 1);
   }

   function goToPreviousPage() {
      setCurrentPage((page) => page - 1);
   }

   function changePage(event) {
      const pageNumber = Number(event.target.textContent);
      setCurrentPage(pageNumber);
   }

   const getPaginatedData = () => {
      const startIndex = currentPage * dataLimit - dataLimit;
      const endIndex = startIndex + dataLimit;
      return data.slice(startIndex, endIndex);
   };

   const getPaginationGroup = () => {
      let start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;
      return new Array(pageLimit).fill().map((_, idx) => start + idx + 1);
   };

   return (
      <div>
         <table className="table-fixed w-full border-collapse border border-slate-400">
            <thead className="bg-blue-500 text-white text-left">
               <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Symbol</th>
                  <th>Rank</th>
                  <th>Type</th>
                  <th>Active</th>
                  <th>Action</th>
               </tr>
            </thead>
            <tbody>
               {getPaginatedData().map((d, idx) => (
                  <RenderComponent key={idx} data={d} idx={idx} />
               ))}
            </tbody>
         </table>


         <div className="m-4">
            <button
               onClick={goToPreviousPage}
               className={`pageItem ${currentPage === 1 ? 'disabled' : ''}`}
            >
               {`<`}
            </button>

            {getPaginationGroup().map((item, index) => (
               <button
                  key={index}
                  onClick={changePage}
                  className={`pageItem ${currentPage === item ? 'active' : null}`}
               >
                  <span>{item}</span>
               </button>
            ))}

            <button
               onClick={goToNextPage}
               className={`pageItem ${currentPage === pages ? 'disabled' : ''}`}
            >
               {`>`}
            </button>
         </div>
         <style>{`
         .pageItem {
            border: solid 1px #777;
            padding: 16px;
            margin-right: 8px;
            hover: 
         }
         `}</style>
      </div>
   );
}

export default Pagination;