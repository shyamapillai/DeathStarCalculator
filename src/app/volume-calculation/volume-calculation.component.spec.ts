import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgModule } from '@angular/core';
import { VolumeCalculationComponent } from './volume-calculation.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

describe('VolumeCalculationComponent', () => {
  let component: VolumeCalculationComponent;
  let fixture: ComponentFixture<VolumeCalculationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VolumeCalculationComponent],
      imports: [BrowserModule, HttpClientModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(VolumeCalculationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should calculate the total volume of the planets of the enemies accurately', () => {
    const diameters = [15, 48, 225];
    let calculatedPlanetVol = component.calculatePlanetVolume(diameters);
    let expectedPlanetVolume = 0;
    diameters.forEach(element => {
      expectedPlanetVolume = expectedPlanetVolume + (4 / 3) * Math.PI * Math.pow(element / 2, 3);
    });
    console.log(expectedPlanetVolume);
    expect(calculatedPlanetVol).toBe(expectedPlanetVolume);
  });

  it('should handle the planets having negative numbers radius and only calculate the positive integers', () => {
    const diameters = [18, 669, -2];
    let calculatedPlanetVol = component.calculatePlanetVolume(diameters)
    let expectedPlanetVolume = 0;
    diameters.forEach(element => {
      if (element > 0) {
        expectedPlanetVolume = expectedPlanetVolume + (4 / 3) * Math.PI * Math.pow(element / 2, 3);
      }
    });
    expect(calculatedPlanetVol).toBe(expectedPlanetVolume);
  });

  it('should handle the planets having 0 radius and only calculate the positive integers', () => {
    const diameters = [1, 0, 36];
    let calculatedPlanetVol = component.calculatePlanetVolume(diameters);
    let expectedPlanetVolume = 0;
    diameters.forEach(element => {
      if (element > 0) {
        expectedPlanetVolume = expectedPlanetVolume + (4 / 3) * Math.PI * Math.pow(element / 2, 3);
      }
    });
    expect(calculatedPlanetVol).toBe(expectedPlanetVolume);
  });
});
