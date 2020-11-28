# A_Star_Sequencer

### An implementation of A* path planning algorithm purposed as a step sequencer used to trigger music events in maxMSP.

#### This project was made infinitely more approachable with the helpful documentation provided by [Pawel Janicki](https://www.paweljanicki.jp/projects_maxandp5js_en.html) which elaborates on how to integrate p5.js with maxMSP.  Additionally, [Daniel Shiffman's tutorial](https://thecodingtrain.com/CodingChallenges/051.1-astar.html)  on implementing A* in p5.js was a truly wonderful resource to be able to reference.

## Functionality
#### NOTE: The intended functionality of in/out messages is listed below but once the message is received into maxMSP the user can purpose the messages differently if they choose.

| Input Messages | Description |   
| :------------- | :----------: |   
| 'set_stroke_color' | Takes 3 arguments representing RGB values between 0-255 that set the stroke or 'outline' color of the 3D grid. |  
| 'set_background_color' | Takes 3 arguments representing RGB values between 0-255 that set the background color of the 3D space. |


<br/>

| Output Messages | Description  |   
| :------------- | :----------: |   
| 'soundN' where N = [0,7] | Outputs message to trigger sound listeners. (example: 'sound5') |  
| 'pitch_down_quarter' | Decreases pitch by 25%. |
| 'pitch_down_half' | Decreases pitch by 50%.  |
| 'no_pitch' | Sets to original pitch. |
| 'pitch_up_half' | Increases pitch by 50%.  |
| 'pitch_down_quarter' | Increases pitch by 25%. |

<br/>

## Mouse and Keyboard Interactivity

| Actions | Description  |   
| :------------- | :----------: |  
| Mouse press + drag | Rotates the perspective of A* grid. |
| Mouse press right side of screen | Increases frame rate & tempo by a factor of 10.  |
| Mouse press left side of screen | Increases frame rate & tempo by a factor of 5.  |
| Mouse press quadrant 1 | Outputs pitch change message.  Mouse release outputs 'no_pitch' message.|
| Mouse press quadrant 2 | Outputs pitch change message.  Mouse release outputs 'no_pitch' message. |
| Mouse press quadrant 3 | Outputs pitch change message.  Mouse release outputs 'no_pitch' message. |
| Mouse press quadrant 4 | Outputs pitch change message.  Mouse release outputs 'no_pitch' message. | 
