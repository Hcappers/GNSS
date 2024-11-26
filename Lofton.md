# Engineering Notebook: Tyler Lofton

## Sprint 1

During this sprint I worked researching TypeScript since I have never done any work with it before. I created the basic structure of the HTML file and started work on creating getting the context on the canvases and changeing there colors to show I can edit the canvas. Did some minor revisions and work on the teams project proposal.

Struggling to get the canvases to stack properly but can edit each individual canvas.

## Sprint 2

### 10/08/2024

Was able to get the canvases to properly stack still working on the resizing and placement of each individual canvas.

### 10/10/2024

Found out how to resize the individual canvases to place them in a position that makes sense with page we are trying to replicate from the customer.

Struggling to get all canvases to be visible since after a certain point they are not visible.

## Sprint 3

### 10/22/2024

Realized the original way I was trying to create the boxes was really bad and not the way I needed to go about it. I created a new branch that would only use a single canvas and draw everything on that canvas. Was able to recreate all of the original boxes I needed as well as adding text.

I did everything manually so I started to reformat everything in a way that would be easier to add more boxes or other features in the future.

### 10/23/2024

Refactored the code on the test-tyler-no-canvases branch to be more modular and easier to add more boxes in the future. Started working on how to create rings for our satellite constellation map.

### 10/24/2024

Added a function to add text onto the canvas and merged my test branch to main to create a working skeleton.

Started work on adding a bar graph feature to the canvas.

Added text for the RAIM Prediction and Active GPS Status windows.

## Sprint 4

### 10/29/2024

Merged multiple features to main and refactored some code to make it more readible and easier to add features in the furture.

Began work on the bar graph feature to implement a graph that would change given a nuumber.

### 10/31/2024

Added sample text into the satellite status window, began work on creating a background for the bar graph, merged completed features, and reformated the code to make it more readable in the future.

### 11/01/2024

I still do not have the exact dimensions of the monitor we will be using in the future for actual testing. To get ahead of this I made all elements of the canvas be dynamic and resize based on the size of the canvas. This will future proof our code and make it easier to implement on a different monitor or different systems if we want to test this with a different aircraft.

An example of the changes I made are as follows:

New Code:
```typescript

drawBox(
      60 + (graphWidth / 15) * i,
      boxHeight + 50 + graphHeight * (1 - percents[i]),
      graphWidth / 15 - 10,
      graphHeight * percents[i],
      "#ACE5EE",
    );
```

Old Code:
```typescript

    drawBox(60 + 85 * i, 575 + 425 * (1 - percents[i]), 75, 425 * percents[i], "#ACE5EE");
```

Our old code had every element hard coded based on a set size that we were not 100% sure was the actual size we would need.

### 11/06/2024

Created our entire update presentation.

## Sprint 5

### 11/14/2024

While we are waiting to meet with our customer and get a key for MSFS, I have started researching the SDK and how we can go ahead and make a sample instrument. Once we have a sample instrument we can start importing our current work into the basic one.

[Here](https://docs.flightsimulator.com/html/mergedProjects/How_To_Make_An_Aircraft/Contents/Instruments/Creating_JS_Instrument.htm) is a link that contains a lot of information on making a basic instrument for the simulator.

Things that need to get completed:
- Get MSFS and the SDK (Need a customer meeting so hopefully they will pay for the key)
- Create a basic instrument (Research needed and need a key to get the SDK and need to use a windows machine)
- Import our current work

### 11/18/2024

Just purchased a copy of MSFS and downloaded the SDK. Looking into more documentation to start pulling data from the simulator and being able to create a sample instrument. Began work on the poster to present what we have currenty accomplished and what we plan to work on in the future.

### 11/20/2024

Continued work on the poster and found some papers that have studied GPS spoofing in airplanes. The two papers I found are:
- [Attackers can spoof navigation signals without our knowledge. Here's how to fight back GPS lies](https://ieeexplore.ieee.org/abstract/document/7524168)
- [Survery on effective GPS spoofing countermeasures](https://ieeexplore.ieee.org/document/7845038)

These papers give some background information on GPS spoofing and how it relates to aviation.

### 11/21/2024

We had a customer meeting so we could check in and present our current work. Our customer has said they liked the current work that we have and they feel we are on track with what they are looking for. Our next step are to fully add our current work to be usable in MSFS.

Also finished the poster and sent it to the team to review. Updating the information on the SDD as it is a little outdated and doesn't fully allign with the current goals and expectations of the project.

### 11/25/2024

Began updating the poster for the v2 submission using the comments given in the v1 submission. 

Also worked on the SRS v2. Added diagrams to sections 7 and 2. Updated some information in section 2.4 and 2.5.


## Sprint 6

### 11/26/2024

Created the backlog items for sprint 6 and started our sprint.

Completed the poster v2 using the comments given.
Things I worked on:
- Adding the customer name
- Fixed styling for the text
- Updated diagrams

Continued work on the SRS v2 submission.