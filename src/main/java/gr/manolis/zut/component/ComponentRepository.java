package gr.manolis.zut.component;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ComponentRepository extends JpaRepository<Component, Integer> {


    Component findById(int id);
    List<Component> findAllByPageId(int id);
}
