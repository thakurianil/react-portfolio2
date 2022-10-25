/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.mycompany.assignment1v1;

import java.util.ArrayList;

/**
 *
 * @author 12189504
 */
public class Simulator implements IScheduler {

    private ArrayList<Event> events = new ArrayList<>();
    private int clock = 0;
    private final ShopModel model;

    public Simulator(ShopModel model) {
        this.model = model;
    }

    public void intialize(ArrayList<Event> events) {
        this.events = events;
    }

    public void run(int stopTime) {
        if ((events == null) || events.isEmpty()) {
            return;
        }

        Event e = events.remove(0);
        clock = e.getTime();
        // events queue will never become empty as after the first event is 
        // added, every arrival event will generate a new arrival event 
        // (which may be greater than the stop time)
        
        
        System.out.println("Simulation Trace:");//heading beforing printing values
        System.out.println("===================");
        while (clock <= stopTime) {
            e.process(model, this);// the this argument means that we are   
            // passing a reference to this simulator 
            // object to the event’s process method.
            e = events.remove(0);
            clock = e.getTime();
        }
    }

    @Override
    public void schedule(Event event) {

        int log = 0;

        for (int i = 0; i < events.size(); i++) {
            if (event.getTime() > events.get(i).getTime()){

                continue;
                
            }
            events.add(i, event);

            return;
        }
        events.add(event);

    }

}
