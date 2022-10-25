/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Project/Maven2/JavaApp/src/main/java/${packagePath}/${mainClassName}.java to edit this template
 */
package com.mycompany.assignment1v1;

import java.io.FileNotFoundException;
import java.io.PrintWriter;
import java.util.ArrayList;

/**
 *
 * @author 12189504
 */
public class Assignment1v1 {

    public static void main(String[] args) throws FileNotFoundException {

        ShopModel shopModel = new ShopModel(8);//Create shopModel Object

        Simulator simulator = new Simulator(shopModel);//Create simulator object and passing shopModel object of ShopModel

        ArrayList<Event> eventQueue = new ArrayList<>();//create eventQueue arraylist

        ArrivalEvent event = new ArrivalEvent(0);//create event object of ArrivalEvent and pass 0 value to ArrivalEvent method

        eventQueue.add(event);//add ArrivalEvent to eventQueue

        simulator.intialize(eventQueue);//run simulator class's intialize method with eventQueue arraylist

        simulator.run(20);//provide 20 sec stopTime to run method of simulator class

//        PrintWriter p = null;
        
        PrintWriter p = new PrintWriter("Statistics.txt");
        
        p.flush();
        
        p.printf("Statistics");
        
        p.println("================");
        
        p.println("The number of people served = "+shopModel.getNumServed());

        p.println("The lost business =" + shopModel.getLostBusiness());

        shopModel.showGroups(p);//display groups in the shop

        shopModel.showLog(p);//display history/log groups
        
        p.close();

    }
}
