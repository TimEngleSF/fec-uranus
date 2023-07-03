import React, { useState, useRef, useEffect } from 'react';
import RecommendedItems from './RecommendedItems/RecommendedItems.jsx';
import OutfitItems from './OutfitItems/OutfitItems.jsx';
import CompareModal from './CompareModal/CompareModal.jsx';
import './ItemsComponent.css';

const ItemsComponent = ({
  currItem,
  currStyles,
  currAvgRating,
  currentStyle,
  setCurrAvgRating,
  setCurrentStyle,
}) => {
  const [openModal, setOpenModal] = useState(false);
  const [relatedItemData, setRelatedItemData] = useState({});
  return (
    <section className="items-comp--section">
      <RecommendedItems
        setRelatedItemData={setRelatedItemData}
        setOpenModal={setOpenModal}
      />
      <OutfitItems
        currItem={currItem}
        currStyles={currStyles}
        currentStyle={currentStyle}
        currAvgRating={currAvgRating}
      />
      {openModal && (
        <CompareModal cardItem={relatedItemData} setOpenModal={setOpenModal} />
      )}
    </section>
  );
};

export default ItemsComponent;
