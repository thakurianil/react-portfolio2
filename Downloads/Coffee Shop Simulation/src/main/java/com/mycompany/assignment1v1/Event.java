/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.mycompany.assignment1v1;

/**
 *
 * @author 12189504
 */
public abstract class Event {

    private int time;

    public Event(int time) {
        this.time = time;
    }

    public int getTime() {
        return time;
    }

    public abstract void process(ShopModel sm, IScheduler s);

    public void setTime(int time) {
        this.time = time;
    }

}
