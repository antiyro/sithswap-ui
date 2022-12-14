<script>
    export let checked = false;
    export const color = "#2196F3";
  </script>
  
  <style>
    .switch {
      position: relative;
      display: inline-block;
      width: 42px;
      height: 23px;
      left: 6px;
      top: 2px;
    }
  
    .switch input {
      opacity: 0;
      width: 0;
      height: 0;
    }
  
    .slider {
      position: absolute;
      cursor: pointer;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: #ccc;
      -webkit-transition: 0.4s;
      transition: 0.4s;
      border-radius: 34px;
    }
  
    .slider:before {
      position: absolute;
      content: "";
      height: 20px;
      width: 20px;
      top: 1.2px;
      background-color: white;
      -webkit-transition: 0.4s;
      transition: 0.4s;
      border-radius: 50%;
      box-shadow: 1px 3px 3px 1px rgba(0, 0, 0, 0.2);
    }
  
    input:checked + .slider {
      background-color: #2196f3;
    }
  
    input:checked + .slider {
      box-shadow: 0 0 1px #2196f3;
    }
  
    input:checked + .slider:before {
      -webkit-transform: translateX(20px);
      -ms-transform: translateX(20px);
      transform: translateX(20px);
    }
  </style>
  
  <label class="switch">
    <input type="checkbox" bind:checked />
    <span class="slider" />
  </label>