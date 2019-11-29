package gr.manolis.zut.page;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PageRepository extends JpaRepository<Page, Integer> {

    @Override
    @Query("SELECT p FROM PAGES p WHERE p.alive = 1")
    List<Page> findAll();

    Page findById(int id);
}