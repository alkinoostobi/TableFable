<template>
    <div class="overlay">
      <div class="actions">
        <div class="action-label">
          ACTION 1
        </div>
        <div class="action top-left pixel-border pixelborder">
          <div class="image-container">
            <img src="../assets/attack.png" alt="Attack icon">
          </div>
          <span class="action-text">Attack</span>
        </div>
        <div class="action top-right pixel-border pixelborder">
          <div class="image-container">
            <img src="../assets/spell.png" alt="Spell icon">
          </div>
          <span class="action-text">Spell</span>
        </div>
        <div class="action center pixel-border pixelborder">
          <div class="image-container">
            <img src="../assets/skip.png" alt="Skip action icon">
          </div>
          <span class="action-text">Skip Action</span>
        </div>
        <div class="action left pixel-border pixelborder">
          <div class="image-container">
            <img src="../assets/move.png" alt="Action icon">
          </div>
          <span class="action-text">Move Action</span>
        </div>
        <div class="action right pixel-border pixelborder">
          <div class="image-container">
            <img src="../assets/classaction.png" alt="Class action icon">
          </div>
          <span class="action-text">Class Action</span>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'CharacterTurn'
  };
  </script>
  
  <style scoped>
  /* Add the provided pixel-border CSS here */
  .pixel-border {
    --pixel-bg: lightblue;
    --pixel-border: black;
    --pixel-border-2: white;
    --pixel-border-3: var(--pixel-border);
    --pixel: 0.125rem;
    background: var(--pixel-bg);
  }
  
  .overlay {
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
  
  .actions {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  
  .action {
    margin: 10px;
    padding: 0 20px; /* Add padding here */
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .action-label {
    color: white;
    font-size: 1.5em;
    margin-bottom: 20px;
  }
  
  .image-container {
    width: 100px;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .image-container img {
    max-width: 100%;
    max-height: 100%;
  }
  
  .action-text {
    color: black;
    margin-top: 10px;
  }
  
  .top-left {
    order: 1;
  }
  
  .top-right {
    order: 2;
  }
  
  .center {
    order: 3;
  }
  
  .left {
    order: 4;
  }
  
  .right {
    order: 5;
  }
  </style>
  