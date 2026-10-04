// StatsBomb shot locations are normalized to each team's attacking direction.
// A two-goal comparison map keeps France attacking right and rotates Croatia
// 180 degrees toward the left goal. This is not a period-specific match view.
export function shotDisplayPosition(shot){
  const x=shot.x*105/120;
  const y=shot.y*68/80;
  return shot.team==='Croatia'?{x:105-x,y:68-y}:{x,y};
}
